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
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", cc: "NLD", region: "Europe", photo: amsterdam },
  { id: "austin", name: "Austin", country: "United States", cc: "USA", region: "Americas", photo: austin },
  { id: "bangkok", name: "Bangkok", country: "Thailand", cc: "THA", region: "Asia", photo: bangkok },
  { id: "barcelona", name: "Barcelona", country: "Spain", cc: "ESP", region: "Europe", photo: barcelona },
  { id: "berlin", name: "Berlin", country: "Germany", cc: "DEU", region: "Europe", photo: berlin },
  { id: "boston", name: "Boston", country: "United States", cc: "USA", region: "Americas", photo: boston },
  { id: "bsas", name: "Buenos Aires", country: "Argentina", cc: "ARG", region: "Americas", photo: bsas },
  { id: "cairo", name: "Cairo", country: "Egypt", cc: "EGY", region: "Africa", photo: cairo },
  { id: "chicago", name: "Chicago", country: "United States", cc: "USA", region: "Americas", photo: chicago },
  { id: "capetown", name: "Cape Town", country: "South Africa", cc: "ZAF", region: "Africa", photo: capetown },
  { id: "cph", name: "Copenhagen", country: "Denmark", cc: "DNK", region: "Europe", photo: cph },
  { id: "delhi", name: "Delhi", country: "India", cc: "IND", region: "Asia", photo: delhi },
  { id: "denver", name: "Denver", country: "United States", cc: "USA", region: "Americas", photo: denver },
  { id: "hanoi", name: "Hanoi", country: "Vietnam", cc: "VNM", region: "Asia", photo: hanoi },
  { id: "hcmc", name: "Ho Chi Minh City", country: "Vietnam", cc: "VNM", region: "Asia", photo: hcmc },
  { id: "honolulu", name: "Honolulu", country: "United States", cc: "USA", region: "Americas", photo: honolulu },
  { id: "hongkong", name: "Hong Kong", country: "Hong Kong", cc: "HKG", region: "Asia", photo: hongkong },
  { id: "ist", name: "Istanbul", country: "Türkiye", cc: "TUR", region: "Europe", photo: ist },
  { id: "kyoto", name: "Kyoto", country: "Japan", cc: "JPN", region: "Asia", photo: kyoto },
  { id: "vegas", name: "Las Vegas", country: "United States", cc: "USA", region: "Americas", photo: vegas },
  { id: "lisbon", name: "Lisbon", country: "Portugal", cc: "PRT", region: "Europe", photo: lisbon },
  { id: "london", name: "London", country: "United Kingdom", cc: "GBR", region: "Europe", photo: london },
  { id: "la", name: "Los Angeles", country: "United States", cc: "USA", region: "Americas", photo: la },
  { id: "marra", name: "Marrakesh", country: "Morocco", cc: "MAR", region: "Africa", photo: marra },
  { id: "cdmx", name: "Mexico City", country: "Mexico", cc: "MEX", region: "Americas", photo: cdmx },
  { id: "miami", name: "Miami", country: "United States", cc: "USA", region: "Americas", photo: miami },
  { id: "neworleans", name: "New Orleans", country: "United States", cc: "USA", region: "Americas", photo: neworleans },
  { id: "nyc", name: "New York", country: "United States", cc: "USA", region: "Americas", photo: nyc },
  { id: "osaka", name: "Osaka", country: "Japan", cc: "JPN", region: "Asia", photo: osaka },
  { id: "paris", name: "Paris", country: "France", cc: "FRA", region: "Europe", photo: paris },
  { id: "philly", name: "Philadelphia", country: "United States", cc: "USA", region: "Americas", photo: philly },
  { id: "porto", name: "Porto", country: "Portugal", cc: "PRT", region: "Europe", photo: porto },
  { id: "prague", name: "Prague", country: "Czechia", cc: "CZE", region: "Europe", photo: prague },
  { id: "rio", name: "Rio de Janeiro", country: "Brazil", cc: "BRA", region: "Americas", photo: rio },
  { id: "rome", name: "Rome", country: "Italy", cc: "ITA", region: "Europe", photo: rome },
  { id: "sf", name: "San Francisco", country: "United States", cc: "USA", region: "Americas", photo: sf },
  { id: "seattle", name: "Seattle", country: "United States", cc: "USA", region: "Americas", photo: seattle },
  { id: "seoul", name: "Seoul", country: "South Korea", cc: "KOR", region: "Asia", photo: seoul },
  { id: "singapore", name: "Singapore", country: "Singapore", cc: "SGP", region: "Asia", photo: singapore },
  { id: "sydney", name: "Sydney", country: "Australia", cc: "AUS", region: "Oceania", photo: sydney },
  { id: "taipei", name: "Taipei", country: "Taiwan", cc: "TWN", region: "Asia", photo: taipei },
  { id: "tokyo", name: "Tokyo", country: "Japan", cc: "JPN", region: "Asia", photo: tokyo },
  { id: "toronto", name: "Toronto", country: "Canada", cc: "CAN", region: "Americas", photo: toronto },
  { id: "dc", name: "Washington", country: "United States", cc: "USA", region: "Americas", photo: dc },
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
