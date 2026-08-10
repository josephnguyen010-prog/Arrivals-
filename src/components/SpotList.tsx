import { linkLabel } from "../lib/spots";
import { useSpots } from "../state/SpotsContext";
import { SPOT_CATEGORIES } from "../types";
import type { CityId } from "../types";

/** Grouped by category, because that is how you'd ask for one. */
export function SpotList({ city }: { city: CityId }) {
  const { forCity, remove } = useSpots();
  const spots = forCity(city);

  if (spots.length === 0) {
    return <p className="empty">Nothing yet. The first one is usually where you ate.</p>;
  }

  return (
    <div className="spot-groups">
      {SPOT_CATEGORIES.map((category) => {
        const inCategory = spots.filter((spot) => spot.category === category);
        if (inCategory.length === 0) return null;

        return (
          <div className="spot-group" key={category}>
            <p className={category === "Skip it" ? "spot-cat warn" : "spot-cat"}>{category}</p>
            <ul className="spot-list">
              {inCategory.map((spot) => (
                <li key={spot.id}>
                  {spot.photo && <img className="spot-photo" src={spot.photo} alt="" loading="lazy" />}
                  <div className="spot-body">
                    <b>{spot.name}</b>
                    {spot.note && <p>{spot.note}</p>}
                    {spot.url && (
                      <a href={spot.url} target="_blank" rel="noreferrer noopener" className="spot-link">
                        {linkLabel(spot.url)} ↗
                      </a>
                    )}
                  </div>
                  <button
                    className="ghost spot-remove"
                    onClick={() => remove(spot.id)}
                    aria-label={`Remove ${spot.name}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
