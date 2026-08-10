import { useId } from "react";
import { BOX, offsets, rowWidth, starPath } from "./starGeometry";

interface StarsProps {
  value: number | null;
  /** Height of a star in px. Width follows. */
  size?: number;
}

const GAP = 2;
const ROW = rowWidth(GAP);

/**
 * Drawn rather than typed. The ★ glyph pulled whatever symbol font the OS
 * offered, and stacking a filled copy over a grey one fringed at the edges —
 * badly inside a <b>, where the browser synthesises bold by stroking the
 * outline. One gradient across the row gives exact halves with no seam.
 */
export function Stars({ value, size = 13 }: StarsProps) {
  const gradientId = useId();

  if (value === null) {
    return <span className="stars none" aria-label="Not rated" />;
  }

  const height = size * 1.15;
  const stop = `${(value / 5) * 100}%`;

  return (
    <svg
      className="stars"
      viewBox={`0 0 ${ROW} ${BOX}`}
      height={height}
      width={(height * ROW) / BOX}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2={ROW} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset={stop} style={{ stopColor: "var(--accent)" }} />
          <stop offset={stop} style={{ stopColor: "var(--star-empty)" }} />
        </linearGradient>
      </defs>
      {offsets(GAP).map((offset) => (
        <path key={offset} d={starPath(offset)} fill={`url(#${gradientId})`} />
      ))}
    </svg>
  );
}
