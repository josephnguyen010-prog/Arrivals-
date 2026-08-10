import type { City } from "../types";

export interface Match {
  city: City;
  /** Where the name matched, for highlighting. Absent when the country matched. */
  at?: [number, number];
}

/**
 * Ranked so that what you are most likely typing lands at the top: the start of
 * a name first, then the start of any word in it, then anywhere in the name,
 * then the country. Ties fall back to alphabetical so the order never jitters
 * as you type.
 */
export function searchCities(cities: City[], term: string): Match[] {
  const needle = term.trim().toLowerCase();
  if (!needle) return cities.map((city) => ({ city }));

  const scored: { match: Match; rank: number }[] = [];

  for (const city of cities) {
    const name = city.name.toLowerCase();
    const country = city.country.toLowerCase();

    const nameAt = name.indexOf(needle);
    if (nameAt === 0) {
      scored.push({ match: { city, at: [0, needle.length] }, rank: 0 });
      continue;
    }
    if (nameAt > 0) {
      // A match starting a later word beats one buried mid-word.
      const startsWord = name[nameAt - 1] === " " || name[nameAt - 1] === "-";
      scored.push({ match: { city, at: [nameAt, nameAt + needle.length] }, rank: startsWord ? 1 : 2 });
      continue;
    }
    if (country.startsWith(needle)) {
      scored.push({ match: { city }, rank: 3 });
      continue;
    }
    if (country.includes(needle)) {
      scored.push({ match: { city }, rank: 4 });
    }
  }

  return scored
    .sort((a, b) => a.rank - b.rank || a.match.city.name.localeCompare(b.match.city.name))
    .map((entry) => entry.match);
}

/**
 * The rest of the best match's name, when it starts with what you've typed —
 * shown as ghost text after the cursor so the completion is visible before you
 * commit to it. Returns "" when the top hit doesn't extend the term, so nothing
 * is ever suggested that pressing Tab wouldn't actually give you.
 */
export function inlineCompletion(matches: Match[], term: string): string {
  const typed = term.trim();
  if (!typed) return "";

  const best = matches[0];
  if (!best || best.at?.[0] !== 0) return "";

  const name = best.city.name;
  if (name.length <= typed.length) return "";
  if (name.slice(0, typed.length).toLowerCase() !== typed.toLowerCase()) return "";
  return name.slice(typed.length);
}
