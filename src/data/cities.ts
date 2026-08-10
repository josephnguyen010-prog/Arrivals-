import type { City, CityId } from "../types";

import bsas from "../assets/cities/bsas.jpg";
import cdmx from "../assets/cities/cdmx.jpg";
import cph from "../assets/cities/cph.jpg";
import hcmc from "../assets/cities/hcmc.jpg";
import ist from "../assets/cities/ist.jpg";
import lisbon from "../assets/cities/lisbon.jpg";
import marra from "../assets/cities/marra.jpg";
import osaka from "../assets/cities/osaka.jpg";
import porto from "../assets/cities/porto.jpg";
import seoul from "../assets/cities/seoul.jpg";
import taipei from "../assets/cities/taipei.jpg";
import tokyo from "../assets/cities/tokyo.jpg";

/**
 * A stand-in catalogue. The real one comes from GeoNames or Wikidata — cities
 * are a finite, canonical set, which is the property that makes this work.
 * Photographs are from Wikimedia Commons; see CREDITS.md.
 */
export const CITIES: City[] = [
  { id: "hcmc", name: "Ho Chi Minh City", country: "Vietnam", cc: "VNM", region: "Asia", photo: hcmc },
  { id: "tokyo", name: "Tokyo", country: "Japan", cc: "JPN", region: "Asia", photo: tokyo },
  { id: "lisbon", name: "Lisbon", country: "Portugal", cc: "PRT", region: "Europe", photo: lisbon },
  { id: "cdmx", name: "Mexico City", country: "Mexico", cc: "MEX", region: "Americas", photo: cdmx },
  { id: "ist", name: "Istanbul", country: "Türkiye", cc: "TUR", region: "Europe", photo: ist },
  { id: "seoul", name: "Seoul", country: "South Korea", cc: "KOR", region: "Asia", photo: seoul },
  { id: "porto", name: "Porto", country: "Portugal", cc: "PRT", region: "Europe", photo: porto },
  { id: "osaka", name: "Osaka", country: "Japan", cc: "JPN", region: "Asia", photo: osaka },
  { id: "cph", name: "Copenhagen", country: "Denmark", cc: "DNK", region: "Europe", photo: cph },
  { id: "marra", name: "Marrakesh", country: "Morocco", cc: "MAR", region: "Africa", photo: marra },
  { id: "taipei", name: "Taipei", country: "Taiwan", cc: "TWN", region: "Asia", photo: taipei },
  { id: "bsas", name: "Buenos Aires", country: "Argentina", cc: "ARG", region: "Americas", photo: bsas },
];

const BY_ID = new Map<CityId, City>(CITIES.map((city) => [city.id, city]));

export function cityById(id: CityId): City | undefined {
  return BY_ID.get(id);
}

/** Throws on an unknown id — routes validate before calling this. */
export function requireCity(id: CityId): City {
  const city = BY_ID.get(id);
  if (!city) throw new Error(`Unknown city: ${id}`);
  return city;
}

export const REGIONS = ["Asia", "Europe", "Americas", "Africa"] as const;
