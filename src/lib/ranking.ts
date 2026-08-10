import type { CityId, LogState, Placement, Visit } from "../types";

/** Ratings run in half stars, best first. Order here defines the ranking. */
export const RATING_STEPS = ["5", "4.5", "4", "3.5", "3", "2.5", "2", "1.5", "1", "0.5"] as const;

export function ratingOf(state: LogState, id: CityId): number | null {
  for (const step of RATING_STEPS) {
    if (state.rated[step]?.includes(id)) return parseFloat(step);
  }
  return null;
}

/** Every rated city, best to worst: rating first, then order within a rating. */
export function orderedIds(state: LogState): CityId[] {
  return RATING_STEPS.flatMap((step) => state.rated[step] ?? []);
}

export function rankOf(state: LogState, id: CityId): { pos: number; total: number } {
  const flat = orderedIds(state);
  return { pos: flat.indexOf(id) + 1, total: flat.length };
}

export function visitsFor(state: LogState, id: CityId): Visit[] {
  return state.visits.filter((v) => v.city === id);
}

export function ratedCount(state: LogState): number {
  return orderedIds(state).length;
}

/** Removes a city from whichever rating currently holds it. */
function withoutCity(state: LogState, id: CityId): LogState {
  const rated: Record<string, CityId[]> = {};
  for (const [step, ids] of Object.entries(state.rated)) {
    rated[step] = ids.filter((cityId) => cityId !== id);
  }
  return { ...state, rated };
}

/**
 * Begins placing a city at a rating. Re-rating is just placing again, so the
 * city is pulled out of its old rating first and the bracket is measured
 * against what's left.
 */
export function startPlacement(
  state: LogState,
  cityId: CityId,
  rating: number,
): { state: LogState; placement: Placement } {
  const cleaned = withoutCity(state, cityId);
  const key = String(rating);
  const list = cleaned.rated[key] ?? [];
  return {
    state: { ...cleaned, rated: { ...cleaned.rated, [key]: list } },
    placement: { cityId, rating, lo: 0, hi: list.length, asked: 0 },
  };
}

/**
 * The city to compare against next, or null when the slot is pinned down.
 * Binary search: each answer halves the bracket, so placing into a rating
 * holding n cities costs ceil(log2(n + 1)) questions.
 */
export function nextOpponent(state: LogState, placement: Placement): CityId | null {
  if (placement.lo >= placement.hi) return null;
  const list = state.rated[String(placement.rating)] ?? [];
  const mid = (placement.lo + placement.hi) >> 1;
  return list[mid] ?? null;
}

export function recordAnswer(placement: Placement, challengerWon: boolean): Placement {
  const mid = (placement.lo + placement.hi) >> 1;
  return {
    ...placement,
    // Challenger preferred: it sits above `mid`. Otherwise below it.
    lo: challengerWon ? placement.lo : mid + 1,
    hi: challengerWon ? mid : placement.hi,
    asked: placement.asked + 1,
  };
}

/** Questions still to come before the slot is settled. */
export function questionsLeft(placement: Placement): number {
  const span = placement.hi - placement.lo;
  return span <= 0 ? 0 : Math.ceil(Math.log2(span + 1));
}

export function finishPlacement(state: LogState, placement: Placement): LogState {
  const key = String(placement.rating);
  const list = [...(state.rated[key] ?? [])];
  list.splice(placement.lo, 0, placement.cityId);
  return { ...state, rated: { ...state.rated, [key]: list } };
}

export function addVisit(state: LogState, visit: Visit): LogState {
  return {
    ...state,
    visits: [visit, ...state.visits],
    // You went. Departures is what's still ahead of you, so it comes off.
    wishlist: state.wishlist.filter((id) => id !== visit.city),
  };
}

export function isWished(state: LogState, id: CityId): boolean {
  return state.wishlist.includes(id);
}

export function toggleWish(state: LogState, id: CityId): LogState {
  return {
    ...state,
    wishlist: state.wishlist.includes(id)
      ? state.wishlist.filter((cityId) => cityId !== id)
      : [id, ...state.wishlist],
  };
}

/**
 * How many times each visit had happened by the time it happened, oldest
 * first — so the second trip to a city reads "visit 2" in the passport.
 */
export function visitOrdinals(visits: Visit[]): Record<string, number> {
  const seen: Record<CityId, number> = {};
  const ordinals: Record<string, number> = {};
  for (const visit of [...visits].reverse()) {
    seen[visit.city] = (seen[visit.city] ?? 0) + 1;
    ordinals[visit.id] = seen[visit.city];
  }
  return ordinals;
}
