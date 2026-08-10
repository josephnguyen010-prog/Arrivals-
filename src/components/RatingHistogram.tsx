import { RATING_STEPS } from "../lib/ranking";
import { useLog } from "../state/LogContext";

interface RatingHistogramProps {
  /** Clicking a bar filters the grid to that rating. */
  onPick?: (rating: number | null) => void;
  active?: number | null;
}

/**
 * Ratings bunch at the top — nobody flies somewhere hoping to file it under two
 * stars — so the comparison work concentrates in a couple of bands. This makes
 * that visible rather than leaving it as a hunch.
 */
export function RatingHistogram({ onPick, active }: RatingHistogramProps) {
  const { log } = useLog();

  // Low to high, so the chart reads left to right like the star picker.
  const steps = [...RATING_STEPS].reverse();
  const counts = steps.map((step) => (log.rated[step] ?? []).length);
  const total = counts.reduce((sum, n) => sum + n, 0);
  const peak = Math.max(1, ...counts);

  if (total === 0) return null;

  const busiest = counts.indexOf(peak);
  const share = Math.round((peak / total) * 100);

  return (
    <div className="histogram">
      <div className="histogram-head">
        <span className="histogram-title">Your ratings</span>
        <span className="histogram-note">
          {share}% sit at {steps[busiest]} stars
        </span>
      </div>
      <div className="bars">
        {steps.map((step, index) => {
          const count = counts[index];
          const value = parseFloat(step);
          const isActive = active === value;
          return (
            <button
              key={step}
              className={isActive ? "bar active" : "bar"}
              style={{ ["--h" as string]: `${(count / peak) * 100}%` }}
              onClick={() => onPick?.(isActive ? null : value)}
              disabled={!onPick || count === 0}
              title={`${count} ${count === 1 ? "city" : "cities"} at ${step} stars`}
              aria-label={`${count} ${count === 1 ? "city" : "cities"} rated ${step} stars`}
              aria-pressed={isActive}
            >
              <span className="bar-fill" />
              <span className="bar-count">{count || ""}</span>
            </button>
          );
        })}
      </div>
      <div className="histogram-axis">
        <span>½</span>
        <span>5 ★</span>
      </div>
    </div>
  );
}
