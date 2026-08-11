import { useMemo, useState } from "react";
import { CITIES, requireCity } from "../data/cities";
import { ratingOf } from "../lib/ranking";
import { searchCities } from "../lib/search";
import { useLog } from "../state/LogContext";
import { MAX_FAVOURITES, useProfile } from "../state/ProfileContext";
import { Modal } from "./Modal";
import { Stars } from "./Stars";

/** Four slots, in the order you set them. Order is the point of a top four. */
export function FavouritesPicker({ onClose }: { onClose: () => void }) {
  const { profile, setFavourites } = useProfile();
  const { log } = useLog();
  const [picks, setPicks] = useState<string[]>(profile.favourites);
  const [term, setTerm] = useState("");

  const matches = useMemo(
    () => searchCities(CITIES, term).filter((match) => !picks.includes(match.city.id)).slice(0, 8),
    [term, picks],
  );

  function move(index: number, delta: number) {
    setPicks((current) => {
      const next = [...current];
      const target = index + delta;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <Modal onClose={onClose} labelledBy="favourites-title">
      <h2 id="favourites-title">Favourites</h2>
      <h3>Your four</h3>
      <p className="hint">
        They don't have to be your highest rated. That's what the ranking is for.
      </p>

      {picks.length > 0 && (
        <ol className="ordered-picks">
          {picks.map((id, index) => {
            const city = requireCity(id);
            return (
              <li key={id}>
                <span className="list-pos small">{index + 1}</span>
                <img src={city.photo} alt="" />
                <b>{city.name}</b>
                <span className="reorder">
                  <button
                    className="ghost"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label={`Move ${city.name} up`}
                  >
                    ↑
                  </button>
                  <button
                    className="ghost"
                    onClick={() => move(index, 1)}
                    disabled={index === picks.length - 1}
                    aria-label={`Move ${city.name} down`}
                  >
                    ↓
                  </button>
                  <button
                    className="ghost"
                    onClick={() => setPicks(picks.filter((pick) => pick !== id))}
                    aria-label={`Remove ${city.name}`}
                  >
                    ✕
                  </button>
                </span>
              </li>
            );
          })}
        </ol>
      )}

      {picks.length < MAX_FAVOURITES ? (
        <>
          <p className="field-label">
            Add a city · {MAX_FAVOURITES - picks.length} slot
            {MAX_FAVOURITES - picks.length === 1 ? "" : "s"} left
          </p>
          <input
            className="search"
            placeholder="Search cities"
            autoComplete="off"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
          <div className="options">
            {matches.map(({ city }) => (
              <button
                key={city.id}
                className="option"
                onClick={() => {
                  setPicks([...picks, city.id]);
                  setTerm("");
                }}
              >
                <img src={city.photo} alt="" />
                <span>
                  <b>{city.name}</b>
                  <small>{city.country}</small>
                </span>
                <span className="right">
                  <Stars value={ratingOf(log, city.id)} />
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="field-label">All four slots filled. Remove one to swap it out.</p>
      )}

      <div className="sheet-foot">
        <button className="ghost" onClick={onClose}>
          Cancel
        </button>
        <button
          className="log-btn"
          onClick={() => {
            setFavourites(picks);
            onClose();
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
