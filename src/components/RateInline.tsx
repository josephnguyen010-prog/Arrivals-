import { useId, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { BOX, offsets, rowWidth, starPath } from "./starGeometry";

interface RateInlineProps {
  value: number | null;
  size?: number;
  /** Called with the picked rating; the caller decides what happens next. */
  onPick: (rating: number) => void;
  label: string;
}

const GAP = 3;
const ROW = rowWidth(GAP);

/**
 * A star row you can click. Same geometry as the read-only Stars, so a rating
 * looks identical whether or not it happens to be editable — it just responds.
 * Hovering previews; leaving puts the real value back.
 */
export function RateInline({ value, size = 22, onPick, label }: RateInlineProps) {
  const gradientId = useId();
  const [hover, setHover] = useState(0);
  const shown = hover || value || 0;
  const height = size * 1.15;

  function valueFrom(event: MouseEvent<SVGSVGElement>): number {
    const box = event.currentTarget.getBoundingClientRect();
    const fraction = (event.clientX - box.left) / box.width;
    return Math.min(5, Math.max(0.5, Math.ceil(fraction * 10) / 2));
  }

  function onKeyDown(event: KeyboardEvent<SVGSVGElement>) {
    const current = value ?? 0;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      onPick(Math.min(5, current + 0.5));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      onPick(Math.max(0.5, current - 0.5));
    }
  }

  return (
    <svg
      className="stars rate-inline"
      viewBox={`0 0 ${ROW} ${BOX}`}
      height={height}
      width={(height * ROW) / BOX}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0.5}
      aria-valuemax={5}
      aria-valuenow={value ?? undefined}
      aria-valuetext={value === null ? "Not rated" : `${value} out of 5 stars`}
      onMouseMove={(event) => setHover(valueFrom(event))}
      onMouseLeave={() => setHover(0)}
      onClick={(event) => onPick(valueFrom(event))}
      onKeyDown={onKeyDown}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2={ROW} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset={`${(shown / 5) * 100}%`} style={{ stopColor: "var(--accent)" }} />
          <stop offset={`${(shown / 5) * 100}%`} style={{ stopColor: "var(--star-empty)" }} />
        </linearGradient>
      </defs>
      {offsets(GAP).map((offset) => (
        <path key={offset} d={starPath(offset)} fill={`url(#${gradientId})`} />
      ))}
    </svg>
  );
}
