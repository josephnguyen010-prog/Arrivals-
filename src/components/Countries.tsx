import { Link } from "react-router-dom";
import { REGIONS } from "../data/cities";
import { progressFor, slugOf } from "../lib/countries";
import { useLog } from "../state/LogContext";
import type { LogState } from "../types";

/** Countries reached across every region — the heading's count. */
export function countryCount(log: LogState): number {
  return REGIONS.reduce((sum, region) => sum + progressFor(region, log).done, 0);
}

/** And how many there are to reach, so the count has something to be out of. */
export function countryTotal(log: LogState): number {
  return REGIONS.reduce((sum, region) => sum + progressFor(region, log).total, 0);
}

/**
 * A continent a row, with how much of it you have filed. Not how you rate
 * places — the stars on every card on this page already say that — but how
 * much of the world the passport covers, which is the question a passport
 * invites and nothing else here answers.
 *
 * Each row opens its own list, because the useful version of "two of eight" is
 * which two, and more to the point, which six.
 */
export function Countries() {
  const { log } = useLog();

  return (
    <ul className="regions">
      {REGIONS.map((region) => {
        const { done, total } = progressFor(region, log);
        return (
          <li key={region}>
            <Link to={`/countries/${slugOf(region)}`}>
              <span className="rgname">{region}</span>
              {/* A ratio against a fixed limit, so a track that fills rather
                  than a bar that grows: the empty part is the point. */}
              <span className="rgtrack" aria-hidden="true">
                <span className="rgfill" style={{ width: `${(done / total) * 100}%` }} />
              </span>
              <span className="rgcount">
                {done}<i>/{total}</i>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
