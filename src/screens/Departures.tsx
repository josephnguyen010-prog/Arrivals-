import { useMemo, useState } from "react";
import { CityCard } from "../components/CityCard";
import { requireCity, REGIONS } from "../data/cities";
import { ratingOf } from "../lib/ranking";
import { useLog } from "../state/LogContext";

type Sort = "added" | "name" | "region";

const SORT_LABELS: Record<Sort, string> = {
  added: "When added",
  name: "Name",
  region: "Region",
};

/**
 * Just the board. Adding happens from a city page or the search in the top
 * bar, the way a watchlist works — an add-anything grid on this screen made it
 * two screens wearing one hat.
 */
export function Departures() {
  const { log, toggleWishlist } = useLog();
  const [region, setRegion] = useState("all");
  const [sort, setSort] = useState<Sort>("added");

  const rows = useMemo(() => {
    // The wishlist is stored newest first, which is the default order.
    const cities = log.wishlist.map((id) => requireCity(id));
    const filtered = region === "all" ? cities : cities.filter((city) => city.region === region);

    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "region") {
      return [...filtered].sort((a, b) => a.region.localeCompare(b.region) || a.name.localeCompare(b.name));
    }
    return filtered;
  }, [log.wishlist, region, sort]);

  const count = log.wishlist.length;

  return (
    <section className="screen">
      <h2>
        {count === 0 ? "You haven't picked anywhere yet" : `You want to go to ${count} ${count === 1 ? "city" : "cities"}`}
      </h2>

      {count > 0 && (
        <div className="filterbar">
          <select
            className={region === "all" ? "filter" : "filter on"}
            aria-label="Filter by region"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
          >
            <option value="all">Region</option>
            {REGIONS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <span className="spacer" />

          <span className="sort-label">Sort by</span>
          <select
            className="filter"
            aria-label="Sort by"
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
          >
            {(Object.keys(SORT_LABELS) as Sort[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </div>
      )}

      {count === 0 ? (
        <p className="empty">
          Search for a city in the top bar, or open one and use <b>Add to Departures</b>.
        </p>
      ) : rows.length === 0 ? (
        <p className="empty">Nothing on the board in that region.</p>
      ) : (
        <div className="grid">
          {rows.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              to={`/city/${city.id}`}
              rating={ratingOf(log, city.id)}
              plain
              wished
              onToggleWish={() => toggleWishlist(city.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
