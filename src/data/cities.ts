import type { City, CityId } from "../types";

import amsterdam from "../assets/cities/amsterdam.jpg";
import austin from "../assets/cities/austin.jpg";
import bangkok from "../assets/cities/bangkok.jpg";
import barcelona from "../assets/cities/barcelona.jpg";
import berlin from "../assets/cities/berlin.jpg";
import boston from "../assets/cities/boston.jpg";
import bsas from "../assets/cities/bsas.jpg";
import chicago from "../assets/cities/chicago.jpg";
import dc from "../assets/cities/dc.jpg";
import denver from "../assets/cities/denver.jpg";
import honolulu from "../assets/cities/honolulu.jpg";
import la from "../assets/cities/la.jpg";
import miami from "../assets/cities/miami.jpg";
import neworleans from "../assets/cities/neworleans.jpg";
import philly from "../assets/cities/philly.jpg";
import seattle from "../assets/cities/seattle.jpg";
import vegas from "../assets/cities/vegas.jpg";
import cairo from "../assets/cities/cairo.jpg";
import capetown from "../assets/cities/capetown.jpg";
import cdmx from "../assets/cities/cdmx.jpg";
import cph from "../assets/cities/cph.jpg";
import delhi from "../assets/cities/delhi.jpg";
import hanoi from "../assets/cities/hanoi.jpg";
import hcmc from "../assets/cities/hcmc.jpg";
import hongkong from "../assets/cities/hongkong.jpg";
import ist from "../assets/cities/ist.jpg";
import kyoto from "../assets/cities/kyoto.jpg";
import lisbon from "../assets/cities/lisbon.jpg";
import london from "../assets/cities/london.jpg";
import marra from "../assets/cities/marra.jpg";
import nyc from "../assets/cities/nyc.jpg";
import osaka from "../assets/cities/osaka.jpg";
import paris from "../assets/cities/paris.jpg";
import porto from "../assets/cities/porto.jpg";
import prague from "../assets/cities/prague.jpg";
import rio from "../assets/cities/rio.jpg";
import rome from "../assets/cities/rome.jpg";
import seoul from "../assets/cities/seoul.jpg";
import sf from "../assets/cities/sf.jpg";
import singapore from "../assets/cities/singapore.jpg";
import sydney from "../assets/cities/sydney.jpg";
import taipei from "../assets/cities/taipei.jpg";
import tokyo from "../assets/cities/tokyo.jpg";
import toronto from "../assets/cities/toronto.jpg";

/**
 * A stand-in catalogue. The real one comes from GeoNames or Wikidata — cities
 * are a finite, canonical set, which is the property that makes this work.
 * Photographs are from Wikimedia Commons; see CREDITS.md.
 */
export const CITIES: City[] = [
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", region: "Europe", photo: amsterdam },
  { id: "austin", name: "Austin", country: "United States", region: "Americas", photo: austin },
  { id: "bangkok", name: "Bangkok", country: "Thailand", region: "Asia", photo: bangkok },
  { id: "barcelona", name: "Barcelona", country: "Spain", region: "Europe", photo: barcelona },
  { id: "berlin", name: "Berlin", country: "Germany", region: "Europe", photo: berlin },
  { id: "boston", name: "Boston", country: "United States", region: "Americas", photo: boston },
  { id: "bsas", name: "Buenos Aires", country: "Argentina", region: "Americas", photo: bsas },
  { id: "cairo", name: "Cairo", country: "Egypt", region: "Africa", photo: cairo },
  { id: "chicago", name: "Chicago", country: "United States", region: "Americas", photo: chicago },
  { id: "capetown", name: "Cape Town", country: "South Africa", region: "Africa", photo: capetown },
  { id: "cph", name: "Copenhagen", country: "Denmark", region: "Europe", photo: cph },
  { id: "delhi", name: "Delhi", country: "India", region: "Asia", photo: delhi },
  { id: "denver", name: "Denver", country: "United States", region: "Americas", photo: denver },
  { id: "hanoi", name: "Hanoi", country: "Vietnam", region: "Asia", photo: hanoi },
  { id: "hcmc", name: "Ho Chi Minh City", country: "Vietnam", region: "Asia", photo: hcmc },
  { id: "honolulu", name: "Honolulu", country: "United States", region: "Americas", photo: honolulu },
  { id: "hongkong", name: "Hong Kong", country: "Hong Kong", region: "Asia", photo: hongkong },
  { id: "ist", name: "Istanbul", country: "Türkiye", region: "Europe", photo: ist },
  { id: "kyoto", name: "Kyoto", country: "Japan", region: "Asia", photo: kyoto },
  { id: "vegas", name: "Las Vegas", country: "United States", region: "Americas", photo: vegas },
  { id: "lisbon", name: "Lisbon", country: "Portugal", region: "Europe", photo: lisbon },
  { id: "london", name: "London", country: "United Kingdom", region: "Europe", photo: london },
  { id: "la", name: "Los Angeles", country: "United States", region: "Americas", photo: la },
  { id: "marra", name: "Marrakesh", country: "Morocco", region: "Africa", photo: marra },
  { id: "cdmx", name: "Mexico City", country: "Mexico", region: "Americas", photo: cdmx },
  { id: "miami", name: "Miami", country: "United States", region: "Americas", photo: miami },
  { id: "neworleans", name: "New Orleans", country: "United States", region: "Americas", photo: neworleans },
  { id: "nyc", name: "New York", country: "United States", region: "Americas", photo: nyc },
  { id: "osaka", name: "Osaka", country: "Japan", region: "Asia", photo: osaka },
  { id: "paris", name: "Paris", country: "France", region: "Europe", photo: paris },
  { id: "philly", name: "Philadelphia", country: "United States", region: "Americas", photo: philly },
  { id: "porto", name: "Porto", country: "Portugal", region: "Europe", photo: porto },
  { id: "prague", name: "Prague", country: "Czechia", region: "Europe", photo: prague },
  { id: "rio", name: "Rio de Janeiro", country: "Brazil", region: "Americas", photo: rio },
  { id: "rome", name: "Rome", country: "Italy", region: "Europe", photo: rome },
  { id: "sf", name: "San Francisco", country: "United States", region: "Americas", photo: sf },
  { id: "seattle", name: "Seattle", country: "United States", region: "Americas", photo: seattle },
  { id: "seoul", name: "Seoul", country: "South Korea", region: "Asia", photo: seoul },
  { id: "singapore", name: "Singapore", country: "Singapore", region: "Asia", photo: singapore },
  { id: "sydney", name: "Sydney", country: "Australia", region: "Oceania", photo: sydney },
  { id: "taipei", name: "Taipei", country: "Taiwan", region: "Asia", photo: taipei },
  { id: "tokyo", name: "Tokyo", country: "Japan", region: "Asia", photo: tokyo },
  { id: "toronto", name: "Toronto", country: "Canada", region: "Americas", photo: toronto },
  { id: "dc", name: "Washington", country: "United States", region: "Americas", photo: dc },
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

export const REGIONS = ["Asia", "Europe", "Americas", "Africa", "Oceania"] as const;
