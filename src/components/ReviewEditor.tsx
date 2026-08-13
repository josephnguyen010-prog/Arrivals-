import { useState } from "react";
import { useLog } from "../state/LogContext";
import type { City } from "../types";
import { Modal } from "./Modal";

/**
 * What you think of the city, as against a visit's note, which is what one
 * trip was like. The same split the app makes everywhere else: the city is the
 * thing you have an opinion about, the trip is the thing that happened.
 */
export function ReviewEditor({ city, onClose }: { city: City; onClose: () => void }) {
  const { log, setReview } = useLog();
  const existing = log.reviews[city.id] ?? "";
  const [text, setText] = useState(existing);

  return (
    <Modal onClose={onClose} labelledBy="review-title">
      <h2 id="review-title">{city.name}</h2>
      <h3>{existing ? "Your review" : "Write a review"}</h3>
      <p className="hint">
        The whole city, not one trip — go back next year and this is still the thing you'd say about
        the place.
      </p>

      <textarea
        className="search note-box review-box"
        rows={6}
        data-autofocus
        aria-label={`Your review of ${city.name}`}
        placeholder={`What do you make of ${city.name}?`}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <div className="sheet-foot">
        {existing ? (
          <button
            className="ghost danger"
            onClick={() => {
              setReview(city.id, "");
              onClose();
            }}
          >
            Delete it
          </button>
        ) : (
          <span />
        )}
        <span className="foot-pair">
          <button className="ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="log-btn"
            disabled={text.trim() === existing.trim()}
            onClick={() => {
              setReview(city.id, text);
              onClose();
            }}
          >
            Save
          </button>
        </span>
      </div>
    </Modal>
  );
}
