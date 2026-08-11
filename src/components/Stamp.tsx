import type { ReactNode } from "react";
import type { City } from "../types";
import { ArrivalStamp } from "./ArrivalStamp";
import { Stars } from "./Stars";

interface StampProps {
  city: City;
  rating: number | null;
  /** Printed inside the cancellation mark. */
  date?: string;
  /** Replaces the denomination with an editable row. See CityCard. */
  stars?: ReactNode;
}

/**
 * The loud version of a city: perforated edges, the photo as the printed
 * design, and the rating where a stamp's denomination goes. Kept to the city
 * page and the moment a visit is logged.
 */
export function Stamp({ city, rating, date, stars }: StampProps) {
  return (
    <div className="stamp">
      <div className="pic">
        <img src={city.photo} alt={city.name} />
        {rating !== null && <ArrivalStamp city={city} date={date ?? "—"} />}
      </div>
      <div className="plate">
        <div>
          <div className="city">{city.name}</div>
          <div className="country">{city.country}</div>
        </div>
        {stars ?? (rating !== null ? <Stars value={rating} size={14} /> : <span className="unfranked">UNSTAMPED</span>)}
      </div>
    </div>
  );
}
