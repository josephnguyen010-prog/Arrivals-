import { useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";

interface StarPickerProps {
  onPick: (rating: number) => void;
}

/** Half stars come from the left half of each glyph; arrows work too. */
export function StarPicker({ onPick }: StarPickerProps) {
  const [hover, setHover] = useState(0);
  const [keyed, setKeyed] = useState(0);
  const shown = hover || keyed;

  function valueFrom(event: MouseEvent<HTMLDivElement>): number {
    const box = event.currentTarget.getBoundingClientRect();
    const fraction = (event.clientX - box.left) / box.width;
    return Math.min(5, Math.max(0.5, Math.ceil(fraction * 10) / 2));
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setKeyed((current) => Math.min(5, current + 0.5));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setKeyed((current) => Math.max(0.5, current - 0.5));
    } else if (event.key === "Enter" && keyed) {
      onPick(keyed);
    }
  }

  return (
    <div className="picker">
      <div
        className="picker-stars"
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
        <i style={{ width: `${(shown / 5) * 100}%` }} />
      </div>
      <div className="picker-read">
        {shown ? `${shown} ${shown === 1 ? "star" : "stars"}` : "Pick a rating"}
      </div>
    </div>
  );
}
