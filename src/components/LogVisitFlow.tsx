import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES, requireCity } from "../data/cities";
import { nextOpponent, questionsLeft, rankOf, ratingOf, recordAnswer, visitsFor } from "../lib/ranking";
import { useLog } from "../state/LogContext";
import type { CityId, LogState, Placement } from "../types";
import { CityCard } from "./CityCard";
import { Modal } from "./Modal";
import { Stamp } from "./Stamp";
import { StarPicker } from "./StarPicker";
import { Stars } from "./Stars";

const MONTHS = [
  "Aug 2026",
  "Jul 2026",
  "Jun 2026",
  "May 2026",
  "Apr 2026",
  "Mar 2026",
  "Feb 2026",
  "Jan 2026",
];

type Step =
  | { name: "city" }
  | { name: "when"; city: CityId }
  | { name: "rate"; city: CityId; when: string; day: string }
  | { name: "duel"; when: string; day: string; scratch: LogState; placement: Placement }
  | { name: "done"; city: CityId; rating: number; asked: number };

export function LogVisitFlow({ onClose }: { onClose: () => void }) {
  const { log, begin, commitVisit } = useLog();
  const [step, setStep] = useState<Step>({ name: "city" });
  const navigate = useNavigate();

  /** Runs the bracket forward; settles immediately when nothing to compare. */
  function advance(scratch: LogState, placement: Placement, when: string, day: string) {
    if (nextOpponent(scratch, placement)) {
      setStep({ name: "duel", when, day, scratch, placement });
      return;
    }
    commitVisit(placement, { city: placement.cityId, when, day });
    setStep({ name: "done", city: placement.cityId, rating: placement.rating, asked: placement.asked });
  }

  return (
    <Modal onClose={onClose} labelledBy="log-title">
      {step.name === "city" && (
        <PickCity onPick={(city) => setStep({ name: "when", city })} onClose={onClose} />
      )}

      {step.name === "when" && (
        <PickWhen
          city={step.city}
          onBack={() => setStep({ name: "city" })}
          onClose={onClose}
          onPick={(when, day) => setStep({ name: "rate", city: step.city, when, day })}
        />
      )}

      {step.name === "rate" && (
        <PickRating
          city={step.city}
          onBack={() => setStep({ name: "when", city: step.city })}
          onClose={onClose}
          onPick={(rating) => {
            const { state, placement } = begin(step.city, rating);
            advance(state, placement, step.when, step.day);
          }}
        />
      )}

      {step.name === "duel" && (
        <Duel
          step={step}
          onAnswer={(challengerWon) => {
            const next = recordAnswer(step.placement, challengerWon);
            advance(step.scratch, next, step.when, step.day);
          }}
          onClose={onClose}
        />
      )}

      {step.name === "done" && (
        <Done
          city={step.city}
          rating={step.rating}
          asked={step.asked}
          log={log}
          onDone={() => {
            onClose();
            navigate("/cities");
          }}
        />
      )}
    </Modal>
  );
}

/* -------------------------------------------------------------- steps --- */

function PickCity({ onPick, onClose }: { onPick: (id: CityId) => void; onClose: () => void }) {
  const { log } = useLog();
  const [term, setTerm] = useState("");

  const matches = useMemo(() => {
    const needle = term.trim().toLowerCase();
    if (!needle) return CITIES;
    return CITIES.filter(
      (city) =>
        city.name.toLowerCase().includes(needle) || city.country.toLowerCase().includes(needle),
    );
  }, [term]);

  return (
    <>
      <h2 id="log-title">Step 1 of 3</h2>
      <h3>Where did you go?</h3>
      <input
        className="search"
        placeholder="Search cities"
        autoComplete="off"
        autoFocus
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      <div className="options">
        {matches.map((city) => {
          const rating = ratingOf(log, city.id);
          return (
            <button key={city.id} className="option" onClick={() => onPick(city.id)}>
              <img src={city.photo} alt="" />
              <span>
                <b>{city.name}</b>
                <small>{city.country}</small>
              </span>
              <span className="right">
                {rating === null ? <small>New</small> : <Stars value={rating} />}
              </span>
            </button>
          );
        })}
        {matches.length === 0 && (
          <p className="empty" style={{ padding: "10px" }}>
            No city by that name. In the real thing, this is where you would add one.
          </p>
        )}
      </div>
      <Foot onClose={onClose} />
    </>
  );
}

function PickWhen({
  city,
  onPick,
  onBack,
  onClose,
}: {
  city: CityId;
  onPick: (when: string, day: string) => void;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <h2 id="log-title">Step 2 of 3</h2>
      <h3>When were you in {requireCity(city).name}?</h3>
      <p className="hint">
        A visit, not a city. Go back next year and you log it again — the rating stays yours to change.
      </p>
      <div className="chips">
        {MONTHS.map((month) => (
          <button key={month} className="chip" onClick={() => onPick(month, dayOf())}>
            {month}
          </button>
        ))}
        <button className="chip" onClick={() => onPick("Before 2026", dayOf())}>
          Earlier
        </button>
      </div>
      <Foot onBack={onBack} onClose={onClose} />
    </>
  );
}

function PickRating({
  city,
  onPick,
  onBack,
  onClose,
}: {
  city: CityId;
  onPick: (rating: number) => void;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <h2 id="log-title">Step 3 of 3</h2>
      <h3>How was {requireCity(city).name}?</h3>
      <p className="hint">Half stars count. Click the left half of a star for a half.</p>
      <StarPicker onPick={onPick} />
      <Foot onBack={onBack} onClose={onClose} />
    </>
  );
}

function Duel({
  step,
  onAnswer,
  onClose,
}: {
  step: Extract<Step, { name: "duel" }>;
  onAnswer: (challengerWon: boolean) => void;
  onClose: () => void;
}) {
  const opponentId = nextOpponent(step.scratch, step.placement);
  if (!opponentId) return null;

  const challenger = requireCity(step.placement.cityId);
  const opponent = requireCity(opponentId);
  const left = questionsLeft(step.placement);

  return (
    <>
      <h2 id="log-title">Same rating</h2>
      <h3>You gave both {step.placement.rating} stars. Which was better?</h3>
      <div className="duel">
        <button onClick={() => onAnswer(true)} aria-label={`${challenger.name} was better`}>
          {/* The challenger already has this rating — it just isn't in the log yet. */}
          <CityCard city={challenger} rating={step.placement.rating} />
        </button>
        <span className="vs">OR</span>
        <button onClick={() => onAnswer(false)} aria-label={`${opponent.name} was better`}>
          <CityCard city={opponent} rating={step.placement.rating} />
        </button>
      </div>
      <span className="progress">
        Question {step.placement.asked + 1} · about {left} left
      </span>
      <Foot onClose={onClose} />
    </>
  );
}

function Done({
  city,
  rating,
  asked,
  log,
  onDone,
}: {
  city: CityId;
  rating: number;
  asked: number;
  log: LogState;
  onDone: () => void;
}) {
  const target = requireCity(city);
  const rank = rankOf(log, city);
  const visits = visitsFor(log, city);

  return (
    <div className="result">
      <Stamp city={target} rating={rating} date={visits[0]?.when.toUpperCase()} />
      <p className="verdict-line">
        {target.name} is your #{rank.pos}
      </p>
      <p>
        {rating} stars, {rank.pos} of {rank.total} cities
        {asked > 0 && `, settled in ${asked} ${asked === 1 ? "question" : "questions"}`}.
      </p>
      <button className="log-btn" style={{ width: "100%" }} onClick={onDone}>
        See your cities
      </button>
    </div>
  );
}

function Foot({ onBack, onClose }: { onBack?: () => void; onClose: () => void }) {
  return (
    <div className="sheet-foot">
      {onBack ? (
        <button className="ghost" onClick={onBack}>
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button className="ghost" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}

/** Placeholder day-of-month until the flow takes a real date. */
function dayOf(): string {
  return String(1 + Math.floor(Math.random() * 27)).padStart(2, "0");
}
