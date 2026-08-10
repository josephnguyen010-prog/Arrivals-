import { Link, useParams } from "react-router-dom";
import { PhotoCreditLine } from "../components/PhotoCreditLine";
import { Stamp } from "../components/Stamp";
import { Stars } from "../components/Stars";
import { cityById } from "../data/cities";
import { FEED } from "../data/seed";
import { rankOf, ratingOf, visitsFor } from "../lib/ranking";
import { useLog } from "../state/LogContext";

export function CityPage() {
  const { id = "" } = useParams();
  const { log } = useLog();
  const city = cityById(id);

  if (!city) {
    return (
      <section className="screen">
        <Link className="back" to="/cities">
          ← All cities
        </Link>
        <p className="empty">No city with that name here yet.</p>
      </section>
    );
  }

  const rating = ratingOf(log, city.id);
  const rank = rankOf(log, city.id);
  const visits = visitsFor(log, city.id);
  const friends = FEED.filter((item) => item.city === city.id);

  return (
    <section className="screen">
      <Link className="back" to="/cities">
        ← All cities
      </Link>

      <div className="city-top">
        <div>
          <Stamp city={city} rating={rating} date={visits[0]?.when.toUpperCase()} />
          <PhotoCreditLine city={city.id} />
        </div>
        <div>
          <p className="eyebrow">
            {city.country} · {city.cc} · {city.region}
          </p>
          <h1>{city.name}</h1>
          <div className="city-meta">
            {rating === null ? (
              <div className="pstat left">
                <b>—</b>
                <span>Not been</span>
              </div>
            ) : (
              <>
                <div className="pstat left">
                  <b>
                    <Stars value={rating} size={21} />
                  </b>
                  <span>Your rating</span>
                </div>
                <div className="pstat left">
                  <b>#{rank.pos}</b>
                  <span>of your {rank.total}</span>
                </div>
                <div className="pstat left">
                  <b>{visits.length}</b>
                  <span>{visits.length === 1 ? "Visit" : "Visits"}</span>
                </div>
              </>
            )}
          </div>
          <p className="empty" style={{ margin: 0 }}>
            {rating === null
              ? "Log a visit and it slots into your ranking."
              : `Ranked against the other cities you gave ${rating} stars.`}
          </p>
        </div>
      </div>

      <div className="two-col">
        <div>
          <h2>Your visits</h2>
          {visits.length === 0 ? (
            <p className="empty">Nothing yet.</p>
          ) : (
            <ul className="visit-log">
              {visits.map((visit) => (
                <li key={visit.id}>
                  <time>
                    {visit.day} {visit.when}
                  </time>
                  <span>Postmarked</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2>From people you follow</h2>
          {friends.length === 0 ? (
            <p className="empty">Nobody you follow has been.</p>
          ) : (
            friends.map((item) => (
              <div className="friend-note" key={item.id}>
                <div className="who-line">
                  <b>{item.who}</b>
                  <Stars value={item.rating} />
                </div>
                <p>{item.note}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
