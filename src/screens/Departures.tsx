import { Link } from "react-router-dom";
import { CityCard } from "../components/CityCard";
import { CITIES, requireCity } from "../data/cities";
import { ratingOf } from "../lib/ranking";
import { useLog } from "../state/LogContext";

export function Departures() {
  const { log, toggleWishlist } = useLog();
  const unvisited = CITIES.filter(
    (city) => ratingOf(log, city.id) === null && !log.wishlist.includes(city.id),
  );

  return (
    <section className="screen">
      <h2>Departures</h2>
      <p className="lede">
        Where you're going, rather than where you've been. Logging a visit takes a city off this
        board on its own — you got there.
      </p>

      {log.wishlist.length === 0 ? (
        <p className="empty">Nothing booked. Add a city from its page, or from the list below.</p>
      ) : (
        <div className="grid">
          {log.wishlist.map((id) => {
            const city = requireCity(id);
            return (
              <div className="departure" key={id}>
                <Link to={`/city/${id}`}>
                  <CityCard city={city} rating={ratingOf(log, id)} />
                </Link>
                <button className="ghost" onClick={() => toggleWishlist(id)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}

      {unvisited.length > 0 && (
        <>
          <h2 style={{ marginTop: "40px" }}>Not been, not booked</h2>
          <div className="grid tight">
            {unvisited.map((city) => (
              <div className="departure" key={city.id}>
                <Link to={`/city/${city.id}`}>
                  <CityCard city={city} rating={null} />
                </Link>
                <button className="ghost" onClick={() => toggleWishlist(city.id)}>
                  + Departures
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
