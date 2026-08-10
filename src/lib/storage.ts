import type { LogState } from "../types";
import { SEED_LOG } from "../data/seed";

const KEY = "arrivals.log.v1";
/** Pre-rename key. Read once so a rename doesn't wipe someone's log. */
const LEGACY_KEY = "postmark.log.v1";

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
    return { rated: parsed.rated, visits: parsed.visits };
  } catch {
    // Corrupt or unavailable storage shouldn't cost you the app.
    return SEED_LOG;
  }
}

export function saveLog(state: LogState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
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
