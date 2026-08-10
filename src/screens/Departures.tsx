import { useMemo, useState } from "react";
import { CityCard } from "../components/CityCard";
import { Stars } from "../components/Stars";
import { CITIES, requireCity } from "../data/cities";
import { ratingOf, visitsFor } from "../lib/ranking";
import { inlineCompletion, searchCities } from "../lib/search";
import { useLog } from "../state/LogContext";

/**
 * One board and one way to add to it. The earlier version showed a second grid
 * of every city you hadn't been to, which read as a duplicate of the Cities
 * screen; a search box does the same job without the noise.
 */
export function Departures() {
  const { log, toggleWishlist } = useLog();
  const [term, setTerm] = useState("");

  const matches = useMemo(() => {
    if (!term.trim()) return [];
    return searchCities(CITIES, term)
      .filter((match) => !log.wishlist.includes(match.city.id))
      .slice(0, 6);
  }, [term, log.wishlist]);

  const completion = inlineCompletion(matches, term);

  const elsewhere = useMemo(
    () =>
      CITIES.filter(
        (city) =>
          ratingOf(log, city.id) === null &&
          visitsFor(log, city.id).length === 0 &&
          !log.wishlist.includes(city.id),
      ),
    [log],
  );

  return (
    <section className="screen">
      <h2>Departures</h2>
      <p className="lede">
        Where you're going, rather than where you've been. Log a visit and the city comes off this
        board on its own — you got there.
      </p>

      <div className="add-departure">
        <div className="typeahead">
          <div className="ghost-text" aria-hidden="true">
            <span className="typed">{term}</span>
            <span className="rest">{completion}</span>
          </div>
          <input
            className="search"
            placeholder="Add a city to the board"
            autoComplete="off"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Tab" && completion) {
                event.preventDefault();
                setTerm(matches[0].city.name);
              } else if (event.key === "Enter" && matches[0]) {
                event.preventDefault();
                toggleWishlist(matches[0].city.id);
                setTerm("");
              }
            }}
          />
        </div>

        {matches.length > 0 && (
          <div className="options">
            {matches.map(({ city }) => (
              <button
                key={city.id}
                className="option"
                onClick={() => {
                  toggleWishlist(city.id);
                  setTerm("");
                }}
              >
                <img src={city.photo} alt="" />
                <span>
                  <b>{city.name}</b>
                  <small>{city.country}</small>
                </span>
                <span className="right">
                  {ratingOf(log, city.id) === null ? <small>Add</small> : <Stars value={ratingOf(log, city.id)} />}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {log.wishlist.length === 0 ? (
        <p className="empty">Nothing on the board yet. Search above, or add one from below.</p>
      ) : (
        <div className="grid">
          {log.wishlist.map((id) => (
            <CityCard
              key={id}
              city={requireCity(id)}
              to={`/city/${id}`}
              rating={ratingOf(log, id)}
              wished
              onToggleWish={() => toggleWishlist(id)}
            />
          ))}
        </div>
      )}

      {/* Cities only lists where you've been, so this is where the rest of the
          catalogue lives — and it is no longer a duplicate of that screen. */}
      {elsewhere.length > 0 && (
        <>
          <h2 style={{ marginTop: "40px" }}>Everywhere else</h2>
          <p className="lede">
            The {elsewhere.length} cities you haven't been to and haven't booked. The <b>+</b> puts one
            on the board.
          </p>
          <div className="grid tight">
            {elsewhere.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                to={`/city/${city.id}`}
                rating={null}
                onToggleWish={() => toggleWishlist(city.id)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
