import { useId } from "react";
import type { City } from "../types";

interface ArrivalStampProps {
  city: City;
  date: string;
}

/**
 * The entry mark: double ring, port of entry arced over the top, date across
 * the middle. Shaped after a passport arrival stamp, which is why the country
 * code leads and the date is the only thing in the centre.
 */
export function ArrivalStamp({ city, date }: ArrivalStampProps) {
  const arcId = useId();
  return (
    <svg className="cancel" width="90" height="90" viewBox="0 0 92 92" aria-hidden="true">
      <g transform="rotate(-9 46 46)" fill="none" stroke="var(--stamp-ink)" strokeWidth="1.6">
        <circle cx="46" cy="46" r="31" />
        <circle cx="46" cy="46" r="25.5" strokeWidth="0.9" />
        <path d="M78 34 q7 5 0 10" strokeWidth="1.4" />
        <path d="M78 46 q7 5 0 10" strokeWidth="1.4" />
        <path d="M78 58 q7 5 0 10" strokeWidth="1.4" />
      </g>
      <g transform="rotate(-9 46 46)">
        <path id={arcId} d="M 22.5 46 A 23.5 23.5 0 0 1 69.5 46" fill="none" />
        <text fontFamily="Courier New, monospace" fontSize="7.6" letterSpacing="1.1" fill="var(--stamp-ink)">
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            {`${city.cc} · ${city.name.toUpperCase().slice(0, 14)}`}
          </textPath>
        </text>
        <text
          x="46"
          y="52"
          textAnchor="middle"
          fontFamily="Courier New, monospace"
          fontSize="9"
          letterSpacing="0.6"
          fill="var(--stamp-ink)"
        >
          {date}
        </text>
      </g>
    </svg>
  );
}
