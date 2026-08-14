import { CITIES } from "../data/cities";
import { orderedIds } from "./ranking";
import type { City, LogState, Region } from "../types";

export interface CountryRow {
  country: string;
  /** Every city the app knows in that country, in catalogue order. */
  cities: City[];
  /** The ones you have logged. A country counts as reached at one. */
  visited: City[];
}

export interface RegionProgress {
  region: Region;
  done: number;
  total: number;
  rows: CountryRow[];
}

/**
 * A continent is "complete" against the cities this app actually carries, not
 * against the UN's list. Forty-eight rows for Asia, forty-four of which you
 * could never tick because there is no city behind them, would be a checklist
 * that mostly cannot be checked — and the point of the list is that every
 * unticked line is somewhere you could go and log tomorrow.
 */
export function progressFor(region: Region, log: LogState): RegionProgress {
  const logged = new Set(orderedIds(log));

  const byCountry = new Map<string, City[]>();
  for (const city of CITIES) {
    if (city.region !== region) continue;
    byCountry.set(city.country, [...(byCountry.get(city.country) ?? []), city]);
  }

  const rows: CountryRow[] = [...byCountry.entries()]
    .map(([country, cities]) => ({
      country,
      cities,
      visited: cities.filter((city) => logged.has(city.id)),
    }))
    // Reached first, and alphabetical within each half: the ticks group at the
    // top where they read as progress, rather than scattering down the list.
    .sort(
      (a, b) =>
        Number(b.visited.length > 0) - Number(a.visited.length > 0) ||
        a.country.localeCompare(b.country),
    );

  return {
    region,
    done: rows.filter((row) => row.visited.length > 0).length,
    total: rows.length,
    rows,
  };
}

/** The URL fragment for a region, and back again. */
export function slugOf(region: string): string {
  return region.toLowerCase();
}
