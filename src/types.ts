export type CityId = string;

export interface City {
  id: CityId;
  name: string;
  country: string;
  region: "Asia" | "Europe" | "Americas" | "Africa" | "Oceania";
  photo: string;
}

export interface Visit {
  id: string;
  city: CityId;
  /** Month and year, e.g. "Mar 2026". Visits are day-precision at most. */
  when: string;
  day: string;
  /** What the trip was like. Yours — the feed's notes belong to other people. */
  note?: string;
}

/**
 * `rated` maps a star rating to the cities given it, ordered best first.
 * Order inside a rating is the preference the comparison flow discovers;
 * the rating itself is what the user chose outright.
 */
export interface LogState {
  rated: Record<string, CityId[]>;
  visits: Visit[];
  /** Departures: cities you mean to reach, newest intention first. */
  wishlist: CityId[];
  /**
   * What you think of the city, as against a visit's note, which is what one
   * trip was like. The same split as the rating: the city is the thing you
   * have an opinion about, the trip is the thing that happened.
   */
  reviews: Record<CityId, string>;
}

export const SPOT_CATEGORIES = [
  "Favourite restaurant",
  "Hidden gem",
  "Must-see view",
  "Skip it",
] as const;

export type SpotCategory = (typeof SPOT_CATEGORIES)[number];

export interface Spot {
  id: string;
  city: CityId;
  category: SpotCategory;
  name: string;
  note?: string;
  /** Already validated as http(s) before it is stored. */
  url?: string;
  /** A downscaled JPEG data URL — the original never reaches storage. */
  photo?: string;
}

/** An in-flight insertion. `lo`/`hi` bracket the slot the city belongs in. */
export interface Placement {
  cityId: CityId;
  rating: number;
  lo: number;
  hi: number;
  asked: number;
}

/**
 * Someone you follow, and a trip they logged. Their note is their review of the
 * city, and it is read-only: it lives on the entry, not on your city page.
 */
export interface FeedItem {
  id: string;
  who: string;
  handle: string;
  city: CityId;
  rating: number;
  when: string;
  note: string;
  tags: string[];
}

export interface CityList {
  id: string;
  title: string;
  by: string;
  /** Total cities in the list; seeded lists show more than they store. */
  count: number;
  blurb: string;
  cities: CityId[];
  /** Yours to edit, rather than someone else's to read. */
  mine?: boolean;
}
