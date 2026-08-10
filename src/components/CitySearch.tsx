import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES } from "../data/cities";
import { ratingOf } from "../lib/ranking";
import { inlineCompletion, searchCities } from "../lib/search";
import { useLog } from "../state/LogContext";
import { Modal } from "./Modal";
import { Stars } from "./Stars";

/**
 * Finding any city, from anywhere. Cities lists only where you've been and
 * Departures only where you're going, so this is how the rest of the catalogue
 * stays reachable — the same job the search in Letterboxd's nav does.
 */
export function CitySearch({ onClose }: { onClose: () => void }) {
  const { log, toggleWishlist } = useLog();
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => searchCities(CITIES, term).slice(0, 8), [term]);
  const completion = inlineCompletion(matches, term);

  useEffect(() => setActive(0), [term]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function open(id: string) {
    navigate(`/city/${id}`);
    onClose();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(matches.length - 1, current + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(0, current - 1));
    } else if (event.key === "Tab" && completion) {
      event.preventDefault();
      setTerm(matches[0].city.name);
    } else if (event.key === "Enter" && matches[active]) {
      event.preventDefault();
      open(matches[active].city.id);
    }
  }

  return (
    <Modal onClose={onClose} labelledBy="city-search-title">
      <h2 id="city-search-title">Search</h2>
      <h3>Find a city</h3>

      <div className="typeahead">
        <div className="ghost-text" aria-hidden="true">
          <span className="typed">{term}</span>
          <span className="rest">{completion}</span>
        </div>
        <input
          className="search"
          placeholder="Anywhere in the catalogue"
          autoComplete="off"
          autoFocus
          role="combobox"
          aria-expanded={matches.length > 0}
          aria-controls="search-matches"
          aria-autocomplete="both"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>

      <div className="options" id="search-matches" role="listbox" ref={listRef}>
        {matches.map(({ city }, index) => {
          const rating = ratingOf(log, city.id);
          const wished = log.wishlist.includes(city.id);
          return (
            <div className="search-row" key={city.id}>
              <button
                className="option"
                role="option"
                aria-selected={index === active}
                data-active={index === active}
                onMouseEnter={() => setActive(index)}
                onClick={() => open(city.id)}
              >
                <img src={city.photo} alt="" />
                <span>
                  <b>{city.name}</b>
                  <small>{city.country}</small>
                </span>
                <span className="right">
                  {rating === null ? <small>Not been</small> : <Stars value={rating} />}
                </span>
              </button>
              <button
                className={wished ? "pin on static" : "pin static"}
                aria-pressed={wished}
                aria-label={wished ? `Remove ${city.name} from Departures` : `Add ${city.name} to Departures`}
                title={wished ? "On your Departures board" : "Add to Departures"}
                onClick={() => toggleWishlist(city.id)}
              >
                {wished ? "✓" : "+"}
              </button>
            </div>
          );
        })}
        {matches.length === 0 && (
          <p className="empty" style={{ padding: "10px" }}>
            No city called “{term.trim()}”.
          </p>
        )}
      </div>

      <div className="sheet-foot">
        <span className="ghost-hint" style={{ margin: 0 }}>
          Enter opens · + adds to Departures
        </span>
        <button className="ghost" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
