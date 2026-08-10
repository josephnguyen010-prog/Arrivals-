import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { City } from "../types";
import { Stars } from "./Stars";

interface CityCardProps {
  city: City;
  rating: number | null;
  /** Repeat visits earn a counter; hidden where it would be noise. */
  visits?: number;
  /** Where the card links to. Omitted inside a comparison, where it is a button. */
  to?: string;
  /** Shows the Departures toggle in the corner. */
  wished?: boolean;
  onToggleWish?: () => void;
  /**
   * On the Departures board itself, every card is on the board, so a tick
   * states what you can already see. There the control is a plain remove.
   */
  wishMode?: "toggle" | "remove";
  onEdit?: () => void;
  /**
   * Drops the greyed-out treatment and the "Not been" label. Used on the
   * Departures board, where nowhere has been visited — saying so on every card
   * is noise, and draining the colour makes a wishlist look joyless.
   */
  plain?: boolean;
}

/**
 * The quiet version, built for scanning a grid of them.
 *
 * The card owns its own link rather than being wrapped in one, so the corner
 * buttons can sit beside it. A button nested inside an anchor is invalid, and
 * it drags the button's label into the link's accessible name — every card
 * ended up announcing itself as "Add Tokyo to Departures".
 */
export function CityCard({
  city,
  rating,
  visits = 0,
  to,
  wished,
  onToggleWish,
  wishMode = "toggle",
  onEdit,
  plain,
}: CityCardProps) {
  const removing = wishMode === "remove";
  const wrap = (children: ReactNode, className?: string) =>
    to ? (
      <Link to={to} className={className}>
        {children}
      </Link>
    ) : (
      <div className={className}>{children}</div>
    );

  return (
    <div className={rating === null && !plain ? "card unvisited" : "card"}>
      <div className="shot">
        {wrap(<img src={city.photo} alt={city.name} loading="lazy" />, "shot-link")}
        {visits > 1 && <span className="revisits">↻ {visits}</span>}

        {onEdit && (
          <button className="pin edit" aria-label={`Edit ${city.name}`} onClick={onEdit}>
            ✎
          </button>
        )}

        {onToggleWish &&
          (removing ? (
            <button
              className="pin remove"
              aria-label={`Remove ${city.name} from Departures`}
              title="Remove from Departures"
              onClick={onToggleWish}
            >
              ✕
            </button>
          ) : (
            <button
              className={wished ? "pin on" : "pin"}
              aria-pressed={wished}
              aria-label={wished ? `Remove ${city.name} from Departures` : `Add ${city.name} to Departures`}
              title={wished ? "On your Departures board" : "Add to Departures"}
              onClick={onToggleWish}
            >
              {wished ? "✓" : "+"}
            </button>
          ))}
      </div>

      {wrap(
        <>
          <div className="cname">{city.name}</div>
          <div className="cmeta">
            <span className="ccountry">{city.cc}</span>
            {rating !== null ? (
              <Stars value={rating} />
            ) : plain ? (
              <span className="ccountry">{city.region}</span>
            ) : (
              <span className="notbeen">Not been</span>
            )}
          </div>
        </>,
        "card-text",
      )}
    </div>
  );
}
