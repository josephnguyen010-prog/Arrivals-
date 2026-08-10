import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CityCard } from "../components/CityCard";
import { RatingHistogram } from "../components/RatingHistogram";
import { CITIES, REGIONS } from "../data/cities";
import { orderedIds, ratingOf, visitsFor } from "../lib/ranking";
import { useLog } from "../state/LogContext";

type RatingFilter = "all" | "4.5" | "4" | "3" | "unrated";
type Sort = "rating" | "recent" | "visits" | "name";

export function Cities() {
  const { log } = useLog();
  const [rating, setRating] = useState<RatingFilter>("all");
  const [exact, setExact] = useState<number | null>(null);
  const [region, setRegion] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("rating");
  const [tight, setTight] = useState(false);

  const rows = useMemo(() => {
    const order = orderedIds(log);

    const filtered = CITIES.filter((city) => {
      if (region !== "all" && city.region !== region) return false;
      const value = ratingOf(log, city.id);
      // A bar in the histogram pins one exact rating and wins over the range.
      if (exact !== null) return value === exact;
      if (rating === "unrated") return value === null;
      if (rating !== "all") return value !== null && value >= parseFloat(rating);
      return true;
    });

    // Unrated cities sink to the bottom of every ordering except by name.
    return [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "visits") return visitsFor(log, b.id).length - visitsFor(log, a.id).length;
      if (sort === "recent") {
        const ai = log.visits.findIndex((v) => v.city === a.id);
        const bi = log.visits.findIndex((v) => v.city === b.id);
        if (ai === -1) return bi === -1 ? 0 : 1;
        if (bi === -1) return -1;
        return ai - bi;
      }
      const ao = order.indexOf(a.id);
      const bo = order.indexOf(b.id);
      if (ao === -1) return bo === -1 ? 0 : 1;
      if (bo === -1) return -1;
      return ao - bo;
    });
  }, [log, rating, exact, region, sort]);

  return (
    <section className="screen">
      <RatingHistogram active={exact} onPick={setExact} />

      <div className="filters">
        <label htmlFor="f-rating">Rated</label>
        <select
          id="f-rating"
          value={rating}
          disabled={exact !== null}
          onChange={(event) => setRating(event.target.value as RatingFilter)}
        >
          <option value="all">Any</option>
          <option value="4.5">4½ and up</option>
          <option value="4">4 and up</option>
          <option value="3">3 and up</option>
          <option value="unrated">Not been</option>
        </select>

        <label htmlFor="f-region">Region</label>
        <select id="f-region" value={region} onChange={(event) => setRegion(event.target.value)}>
          <option value="all">Everywhere</option>
          {REGIONS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <span className="spacer" />

        <label htmlFor="f-sort">Sort by</label>
        <select id="f-sort" value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
          <option value="rating">Your rating</option>
          <option value="recent">Last visited</option>
          <option value="visits">Times visited</option>
          <option value="name">Name</option>
        </select>

        <select
          aria-label="Card size"
          value={tight ? "tight" : "roomy"}
          onChange={(event) => setTight(event.target.value === "tight")}
        >
          <option value="roomy">Large</option>
          <option value="tight">Small</option>
        </select>
      </div>

      {exact !== null && (
        <p className="filter-pin">
          Showing only cities you gave {exact} stars.{" "}
          <button className="ghost" onClick={() => setExact(null)}>
            Clear
          </button>
        </p>
      )}

      {rows.length === 0 ? (
        <p className="empty">Nothing matches those filters.</p>
      ) : (
        <div className={tight ? "grid tight" : "grid"}>
          {rows.map((city) => (
            <Link key={city.id} to={`/city/${city.id}`}>
              <CityCard
                city={city}
                rating={ratingOf(log, city.id)}
                visits={visitsFor(log, city.id).length}
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
