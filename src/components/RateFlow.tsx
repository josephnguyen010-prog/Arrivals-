import { useEffect, useState } from "react";
import { requireCity } from "../data/cities";
import { nextOpponent, questionsLeft, recordAnswer } from "../lib/ranking";
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

  if (!opponentId) return null;

  const opponent = requireCity(opponentId);

  function answer(challengerWon: boolean) {
    const next = recordAnswer(placement, challengerWon);
    if (nextOpponent(state.scratch, next)) {
      setPlacement(next);
      return;
    }
    applyPlacement(next);
    onDone();
  }

  return (
    <Modal onClose={onDone} labelledBy="rate-flow-title">
      <h2 id="rate-flow-title">Same rating</h2>
      <h3>
        You gave both {rating} stars. Which was better?
      </h3>
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
        Question {placement.asked + 1} · about {questionsLeft(placement)} left
      </span>
      <div className="sheet-foot">
        <span />
        <button className="ghost" onClick={onDone}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
