import { useEffect, useState } from "react";
import { requireCity } from "../data/cities";
import { nextOpponent, questionsLeft, recordAnswer, settleEarly } from "../lib/ranking";
import { useLog } from "../state/LogContext";
import type { City, LogState, Placement } from "../types";
import { CityCard } from "./CityCard";
import { Modal } from "./Modal";

interface RateFlowProps {
  city: City;
  rating: number;
  onDone: () => void;
}

/**
 * Everything that happens after a rating is chosen: the comparisons against
 * cities already holding that rating, then the write. Shared by the city page
 * and the edit sheet so re-rating behaves the same wherever it starts.
 *
 * Mounted only once a rating has been picked, so the bracket is set up in
 * state on first render and never re-derived mid-flow.
 */
export function RateFlow({ city, rating, onDone }: RateFlowProps) {
  const { begin, applyPlacement } = useLog();
  const [state] = useState<{ scratch: LogState; first: Placement }>(() => {
    const { state: scratch, placement } = begin(city.id, rating);
    return { scratch, first: placement };
  });
  const [placement, setPlacement] = useState<Placement>(state.first);
  /** Earlier states of the placement, so Back undoes one answer at a time. */
  const [past, setPast] = useState<Placement[]>([]);

  const opponentId = nextOpponent(state.scratch, placement);

  // Nothing to compare against: commit and get out of the way. In an effect
  // rather than during render, since it writes to a store and closes the sheet.
  useEffect(() => {
    if (!opponentId) {
      applyPlacement(placement);
      onDone();
    }
    // applyPlacement removes the city before inserting it, so a repeated run
    // under StrictMode lands on the same state.
  }, [opponentId, placement, applyPlacement, onDone]);

  function answer(challengerWon: boolean) {
    const next = recordAnswer(placement, challengerWon);
    if (nextOpponent(state.scratch, next)) {
      setPast((current) => [...current, placement]);
      setPlacement(next);
      return;
    }
    applyPlacement(next);
    onDone();
  }

  // Left and right pick a side, the same as in the log flow.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        answer(true);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        answer(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  /**
   * Leaving keeps the rating, placed by the answers given so far. A rating
   * with no ties is written the moment it is picked, so having one with ties
   * snap back to the old value on the way out was the odd case, not this.
   */
  function leave() {
    applyPlacement(settleEarly(placement));
    onDone();
  }

  if (!opponentId) return null;

  const opponent = requireCity(opponentId);

  return (
    <Modal onClose={leave} labelledBy="rate-flow-title" focusKey={`q${placement.asked}`}>
      <h2 id="rate-flow-title">Placing it</h2>
      <h3>
        {city.name} or {opponent.name}?
      </h3>
      <p className="hint">
        You gave both {rating} stars. Which did you prefer? Leave whenever — the rating is kept
        either way.
      </p>
      <div className="duel">
        <button onClick={() => answer(true)} aria-label={`${city.name} was better`}>
          <CityCard city={city} rating={rating} />
        </button>
        <span className="vs">OR</span>
        <button onClick={() => answer(false)} aria-label={`${opponent.name} was better`}>
          <CityCard city={opponent} rating={rating} />
        </button>
      </div>
      <span className="progress">
        Question {placement.asked + 1} · about {questionsLeft(placement)} left · ← / → to choose
      </span>
      <div className="sheet-foot">
        {past.length > 0 ? (
          <button
            className="ghost"
            onClick={() => {
              setPlacement(past[past.length - 1]);
              setPast((current) => current.slice(0, -1));
            }}
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        <button className="ghost" onClick={leave}>
          Skip the rest →
        </button>
      </div>
    </Modal>
  );
}
