import { useState } from "react";
import { Link } from "react-router-dom";
import { CityCard } from "../components/CityCard";
import { FavouritesPicker } from "../components/FavouritesPicker";
import { Stars } from "../components/Stars";
import { cityById, requireCity } from "../data/cities";
import { ratingOf, visitOrdinals } from "../lib/ranking";
import { useLog } from "../state/LogContext";
import { MAX_FAVOURITES, useProfile } from "../state/ProfileContext";

const RECENT = 4;
const DEPARTURES_PREVIEW = 6;

export function Profile() {
  const { log } = useLog();
  const { profile } = useProfile();
  const [picking, setPicking] = useState(false);

  const ordinals = visitOrdinals(log.visits);
  const recent = log.visits.slice(0, RECENT);
  const favourites = profile.favourites.map((id) => cityById(id)).filter(Boolean);
  const emptySlots = Math.max(0, MAX_FAVOURITES - favourites.length);

  return (
    <section className="screen profile-page">
      <div className="profile-main">
        <div className="section-head">
          <h2 style={{ border: "none", margin: 0, padding: 0 }}>Favourite cities</h2>
          <button className="ghost" onClick={() => setPicking(true)}>
            {favourites.length === 0 ? "Choose four" : "Edit"}
          </button>
        </div>

        <div className="favourites">
          {favourites.map((city) => (
            <CityCard
              key={city!.id}
              city={city!}
              to={`/city/${city!.id}`}
              rating={ratingOf(log, city!.id)}
              plain
            />
          ))}
          {Array.from({ length: emptySlots }).map((_, index) => (
            <button className="fav-empty" key={index} onClick={() => setPicking(true)}>
              <span>+</span>
              <small>Add a favourite</small>
            </button>
          ))}
        </div>

        <h2 style={{ marginTop: "36px" }}>Recent activity</h2>
        {recent.length === 0 ? (
          <p className="empty">Nothing logged yet.</p>
        ) : (
          <div className="favourites">
            {recent.map((visit) => {
              const city = requireCity(visit.city);
              const nth = ordinals[visit.id] ?? 1;
              return (
                <div className="recent-item" key={visit.id}>
                  <CityCard city={city} to={`/city/${city.id}`} rating={ratingOf(log, city.id)} plain />
                  <span className="recent-when">
                    {visit.when}
                    {nth > 1 && <em> · ↻ {nth}</em>}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <aside className="profile-side">
        <div className="side-head">
          <h2 style={{ border: "none", margin: 0, padding: 0 }}>
            <Link to="/departures">Departures</Link>
          </h2>
          <span className="side-count">{log.wishlist.length}</span>
        </div>
        {log.wishlist.length === 0 ? (
          <p className="empty side-empty">Nothing on the board.</p>
        ) : (
          <Link className="side-strip" to="/departures" aria-label="Open Departures">
            {log.wishlist.slice(0, DEPARTURES_PREVIEW).map((id) => (
              <img key={id} src={requireCity(id).photo} alt="" loading="lazy" />
            ))}
          </Link>
        )}

        <div className="side-head" style={{ marginTop: "28px" }}>
          <h2 style={{ border: "none", margin: 0, padding: 0 }}>
            <Link to="/passport">MyPassport</Link>
          </h2>
          <span className="side-count">{log.visits.length}</span>
        </div>
        <ul className="side-list">
          {log.visits.slice(0, 5).map((visit) => {
            const city = requireCity(visit.city);
            return (
              <li key={visit.id}>
                <Link to={`/city/${city.id}`}>{city.name}</Link>
                <Stars value={ratingOf(log, city.id)} />
              </li>
            );
          })}
        </ul>
      </aside>

      {picking && <FavouritesPicker onClose={() => setPicking(false)} />}
    </section>
  );
}
