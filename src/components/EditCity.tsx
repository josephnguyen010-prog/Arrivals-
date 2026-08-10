import { useState } from "react";
import { nextOpponent, questionsLeft, ratingOf, recordAnswer, visitsFor } from "../lib/ranking";
import { requireCity } from "../data/cities";
import { useLog } from "../state/LogContext";
import type { City, LogState, Placement } from "../types";
import { CityCard } from "./CityCard";
import { Modal } from "./Modal";
import { StarPicker } from "./StarPicker";
import { Stars } from "./Stars";

interface EditCityProps {
  city: City;
  onClose: () => void;
}

type Step =
  | { name: "menu" }
  | { name: "rate" }
  | { name: "duel"; scratch: LogState; placement: Placement };

/**
 * Changing your mind, without going back through logging a visit. Re-rating
 * re-runs the same comparison, because a rating you did not place is just a
 * tie waiting to happen.
 */
export function EditCity({ city, onClose }: EditCityProps) {
  const { log, begin, applyPlacement, removeCity, removeVisit } = useLog();
  const [step, setStep] = useState<Step>({ name: "menu" });

  const rating = ratingOf(log, city.id);
  const visits = visitsFor(log, city.id);

  function advance(scratch: LogState, placement: Placement) {
    if (nextOpponent(scratch, placement)) {
      setStep({ name: "duel", scratch, placement });
      return;
    }
    applyPlacement(placement);
    onClose();
  }

  if (step.name === "rate") {
    return (
      <Modal onClose={onClose} labelledBy="edit-title">
        <h2 id="edit-title">{city.name}</h2>
        <h3>What would you give it now?</h3>
        <p className="hint">
          {rating !== null ? `You had it at ${rating}.` : "It has no rating yet."}
        </p>
        <StarPicker
          onPick={(value) => {
            const { state, placement } = begin(city.id, value);
            advance(state, placement);
          }}
        />
        <div className="sheet-foot">
          <button className="ghost" onClick={() => setStep({ name: "menu" })}>
            ← Back
          </button>
          <button className="ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Modal>
    );
  }

  if (step.name === "duel") {
    const opponentId = nextOpponent(step.scratch, step.placement);
    if (!opponentId) return null;
    const opponent = requireCity(opponentId);
    const left = questionsLeft(step.placement);

    return (
      <Modal onClose={onClose} labelledBy="edit-title">
        <h2 id="edit-title">Same rating</h2>
        <h3>You gave both {step.placement.rating} stars. Which was better?</h3>
        <div className="duel">
          <button
            onClick={() => advance(step.scratch, recordAnswer(step.placement, true))}
            aria-label={`${city.name} was better`}
          >
            <CityCard city={city} rating={step.placement.rating} />
          </button>
          <span className="vs">OR</span>
          <button
            onClick={() => advance(step.scratch, recordAnswer(step.placement, false))}
            aria-label={`${opponent.name} was better`}
          >
            <CityCard city={opponent} rating={step.placement.rating} />
          </button>
        </div>
        <span className="progress">
          Question {step.placement.asked + 1} · about {left} left
        </span>
        <div className="sheet-foot">
          <span />
          <button className="ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} labelledBy="edit-title">
      <h2 id="edit-title">Edit</h2>
      <h3>{city.name}</h3>

      <div className="edit-row">
        <div>
          <b>Rating</b>
          <span>{rating === null ? "Not rated" : <Stars value={rating} size={15} />}</span>
        </div>
        <button className="ghost" onClick={() => setStep({ name: "rate" })}>
          {rating === null ? "Rate it" : "Change"}
        </button>
      </div>

      <p className="field-label">Visits</p>
      {visits.length === 0 ? (
        <p className="empty">None logged.</p>
      ) : (
        <ul className="edit-visits">
          {visits.map((visit) => (
            <li key={visit.id}>
              <time>
                {visit.day} {visit.when}
              </time>
              <button
                className="ghost"
                onClick={() => removeVisit(visit.id)}
                aria-label={`Remove the visit on ${visit.day} ${visit.when}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="sheet-foot">
        <button
          className="ghost danger"
          onClick={() => {
            removeCity(city.id);
            onClose();
          }}
        >
          Remove from your log
        </button>
        <button className="ghost" onClick={onClose}>
          Done
        </button>
      </div>
    </Modal>
  );
}
