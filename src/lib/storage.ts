import type { LogState } from "../types";
import { SEED_LOG } from "../data/seed";

const KEY = "arrivals.log.v1";
/** Pre-rename key. Read once so a rename doesn't wipe someone's log. */
const LEGACY_KEY = "postmark.log.v1";
/** Set once the seeded reviews have been offered to an older log. */
const REVIEWS_BACKFILLED = "arrivals.reviews.backfilled";

/**
 * Local-only for now. Swapping this pair of functions for a Supabase table is
 * the whole migration — nothing above this file knows where the log lives.
 */
export function loadLog(): LogState {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (!raw) return SEED_LOG;
    const parsed = JSON.parse(raw) as Partial<LogState>;
    if (!parsed || typeof parsed !== "object" || !parsed.rated || !Array.isArray(parsed.visits)) {
      return SEED_LOG;
    }
    const stored = parsed.reviews && typeof parsed.reviews === "object" ? parsed.reviews : {};
    return {
      rated: parsed.rated,
      visits: parsed.visits,
      // Logs written before Departures existed have no wishlist.
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      reviews: backfillReviews(stored),
    };
  } catch {
    // Corrupt or unavailable storage shouldn't cost you the app.
    return SEED_LOG;
  }
}

/**
 * The seeded reviews, handed to a log that predates them. Anyone who opened the
 * app before reviews existed had an empty map saved back over the seed on the
 * very first render, and every city read "Nothing yet" from then on.
 *
 * Once, and recorded, rather than any time the map is empty: deleting your last
 * review is a decision, and it shouldn't summon nine more back on the next
 * reload. Anything you have written wins the merge.
 *
 * Reads only. The marker is written by the save that follows, because this runs
 * inside a useState initializer — which StrictMode calls twice, and the second
 * call would have seen a marker the first one had just set, and handed back the
 * empty map it was meant to fill.
 */
function backfillReviews(stored: Record<string, string>): Record<string, string> {
  try {
    if (localStorage.getItem(REVIEWS_BACKFILLED)) return stored;
    return { ...SEED_LOG.reviews, ...stored };
  } catch {
    // No storage to read the marker from; leave the log exactly as it came.
    return stored;
  }
}

export function saveLog(state: LogState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    // Whatever the log holds now, it was written by a version that has reviews,
    // so the backfill above has had its one chance.
    localStorage.setItem(REVIEWS_BACKFILLED, "1");
  } catch {
    // Private browsing and full quotas both land here; the session still works.
  }
}

export function clearLog(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing to do — the reset just won't persist.
  }
}
