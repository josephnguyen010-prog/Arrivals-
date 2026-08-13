export const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Every date in the picker is built from year/month/day parts, which lands on
 * local midnight. Doing the same to "now" makes the comparisons a plain `>`
 * rather than an argument about what time of day counts as today.
 */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function daysInMonth(year: number, month: number): number {
  // Day zero of the next month is the last day of this one.
  return new Date(year, month + 1, 0).getDate();
}

/** Overflowing days roll into the next month, which is what walking a grid wants. */
export function addDays(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta);
}

/**
 * Stepping a month keeps the day where it can. Without the clamp, the 31st of
 * March back a month becomes the 31st of February, which is the 3rd of March —
 * so a Previous button would land you forwards.
 */
export function addMonths(date: Date, delta: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + delta, 1);
  const last = daysInMonth(target.getFullYear(), target.getMonth());
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), last));
}

/** How a date is written down everywhere in the app: "12 Aug 2026". */
export function formatDate(date: Date): string {
  return `${String(date.getDate()).padStart(2, "0")} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * A visit stores its month as "Mar 2026", so the year is the trailing token.
 * Returns null rather than NaN when the string is not in that shape, so a
 * malformed visit drops out of a year filter instead of matching nothing.
 */
export function yearOf(when: string): number | null {
  const match = /(\d{4})\s*$/.exec(when);
  return match ? Number(match[1]) : null;
}
