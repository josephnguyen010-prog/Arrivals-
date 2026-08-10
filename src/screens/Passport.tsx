import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Stars } from "../components/Stars";
import { requireCity } from "../data/cities";
import { ratingOf, visitOrdinals } from "../lib/ranking";
import { useLog } from "../state/LogContext";
import type { Visit } from "../types";

export function Passport() {
  const { log } = useLog();
  const ordinals = visitOrdinals(log.visits);

  // Visits arrive newest first; group runs of the same month as we go.
  const months: { month: string; visits: Visit[] }[] = [];
  for (const visit of log.visits) {
    const last = months[months.length - 1];
    if (last && last.month === visit.when) last.visits.push(visit);
    else months.push({ month: visit.when, visits: [visit] });
  }

  return (
    <section className="screen">
      <h2>Every visit, stamped in order</h2>
      <p className="lede">
        A city can appear here more than once. That is the whole point of the passport — you rate the
        city, but you stamp the trip.
      </p>

      {months.length === 0 && <p className="empty">No visits logged yet.</p>}

      {months.map((group) => (
        <Fragment key={group.month}>
          <div className="month">{group.month}</div>
          {group.visits.map((visit) => {
            const city = requireCity(visit.city);
            const nth = ordinals[visit.id] ?? 1;
            return (
              <Link className="drow" to={`/city/${city.id}`} key={visit.id}>
                <span className="day">{visit.day}</span>
                <span className="thumb">
                  <img src={city.photo} alt="" loading="lazy" />
                </span>
                <span className="dname">
                  {city.name}
                  <small>{city.country}</small>
                </span>
                <span className="again">{nth > 1 ? `↻ visit ${nth}` : ""}</span>
                <Stars value={ratingOf(log, city.id)} />
              </Link>
            );
          })}
        </Fragment>
      ))}
    </section>
  );
}
