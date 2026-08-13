import { useId } from "react";
import type { City } from "../types";

interface ArrivalStampProps {
  city: City;
  date: string;
}

/**
 * The entry mark: double ring, port of entry arced over the top, date across
 * the middle. Shaped after a passport arrival stamp, which is why the date is
 * the only thing in the centre. The country is on the plate below, so the ring
 * carries the city alone.
 */
/** The top half of the inner ring, in user units. */
const ARC = 74;
const BASE_SIZE = 7.6;
/** Courier at 7.6 with 1.1 of tracking runs about this wide per character. */
const PER_CHAR = 5.7;

export function ArrivalStamp({ city, date }: ArrivalStampProps) {
  const arcId = useId();
  const label = city.name.toUpperCase();
  // A textPath silently drops whatever runs off the end of its path, so a long
  // name would lose its last letters rather than look wrong. Shrink to fit.
  const fits = Math.floor(ARC / PER_CHAR);
  const fontSize = label.length > fits ? (BASE_SIZE * fits) / label.length : BASE_SIZE;

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
        <text
          fontFamily="Courier New, monospace"
          fontSize={fontSize}
          letterSpacing="1.1"
          fill="var(--stamp-ink)"
        >
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            {label}
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
