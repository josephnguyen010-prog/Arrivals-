import { useId, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { BOX, offsets, rowWidth, starPath } from "./starGeometry";

interface StarPickerProps {
  onPick: (rating: number) => void;
  /** A rating already given, so re-rating starts where it left off. */
  initial?: number;
  /**
   * Held by the caller. Set this where picking a rating stays on the screen,
   * so the stars go on showing what was chosen once the pointer leaves them.
   */
  value?: number;
}

const GAP = 3;
const ROW = rowWidth(GAP);

/** Half stars come from the left half of each glyph; arrows work too. */
export function StarPicker({ onPick, initial = 0, value }: StarPickerProps) {
  const gradientId = useId();
  const [hover, setHover] = useState(0);
  const [keyed, setKeyed] = useState(initial);
  const shown = hover || value || keyed;

  function valueFrom(event: MouseEvent<SVGSVGElement>): number {
    const box = event.currentTarget.getBoundingClientRect();
    const fraction = (event.clientX - box.left) / box.width;
    return Math.min(5, Math.max(0.5, Math.ceil(fraction * 10) / 2));
  }

  function onKeyDown(event: KeyboardEvent<SVGSVGElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setKeyed((current) => Math.min(5, current + 0.5));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setKeyed((current) => Math.max(0.5, current - 0.5));
    } else if (event.key === "Enter" && keyed) {
      // Without this the keypress keeps its default action, which resolves
      // against whatever has focus once the rating is in - the first control
      // of the next screen - and presses that too.
      event.preventDefault();
      onPick(keyed);
    }
  }

  const stop = `${(shown / 5) * 100}%`;

  return (
    <div className="picker">
      <svg
        className="picker-stars"
        viewBox={`0 0 ${ROW} ${BOX}`}
        role="slider"
        tabIndex={0}
        aria-label="Rating"
        aria-valuemin={0.5}
        aria-valuemax={5}
        aria-valuenow={shown || undefined}
        aria-valuetext={shown ? `${shown} stars` : "No rating yet"}
        onMouseMove={(event) => setHover(valueFrom(event))}
        onMouseLeave={() => setHover(0)}
        onClick={(event) => onPick(valueFrom(event))}
        onKeyDown={onKeyDown}
      >
        <defs>
          {/* See Stars.tsx: var() needs to be a style declaration, not an attribute. */}
          <linearGradient id={gradientId} x1="0" y1="0" x2={ROW} y2="0" gradientUnits="userSpaceOnUse">
            <stop offset={stop} style={{ stopColor: "var(--accent)" }} />
            <stop offset={stop} style={{ stopColor: "var(--star-empty)" }} />
          </linearGradient>
        </defs>
        {offsets(GAP).map((offset) => (
          <path key={offset} d={starPath(offset)} fill={`url(#${gradientId})`} />
        ))}
      </svg>
      <div className="picker-read">
        {shown ? `${shown} ${shown === 1 ? "star" : "stars"}` : "Pick a rating"}
      </div>
    </div>
  );
}
