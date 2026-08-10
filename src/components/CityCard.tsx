import type { City } from "../types";
import { Stars } from "./Stars";

interface CityCardProps {
  city: City;
  rating: number | null;
  /** Repeat visits earn a counter; hidden where it would be noise. */
  visits?: number;
}

/** The quiet version, built for scanning a grid of them. */
export function CityCard({ city, rating, visits = 0 }: CityCardProps) {
  return (
    <div className={rating === null ? "card unvisited" : "card"}>
      <div className="shot">
        <img src={city.photo} alt={city.name} loading="lazy" />
        {visits > 1 && <span className="revisits">↻ {visits}</span>}
      </div>
      <div className="cname">{city.name}</div>
      <div className="cmeta">
        <span className="ccountry">{city.cc}</span>
        {rating === null ? <span className="notbeen">Not been</span> : <Stars value={rating} />}
      </div>
    </div>
  );
}
