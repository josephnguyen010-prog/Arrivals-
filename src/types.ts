export type CityId = string;

export interface City {
  id: CityId;
  name: string;
  country: string;
  /** ISO 3166-1 alpha-3, printed on the arrival stamp. */
  cc: string;
  region: "Asia" | "Europe" | "Americas" | "Africa" | "Oceania";
  photo: string;
}

export interface Visit {
  id: string;
  city: CityId;
  /** Month and year, e.g. "Mar 2026". Visits are day-precision at most. */
  when: string;
  day: string;
}

/**
 * `rated` maps a star rating to the cities given it, ordered best first.
 * Order inside a rating is the preference the comparison flow discovers;
 * the rating itself is what the user chose outright.
 */
export interface LogState {
  rated: Record<string, CityId[]>;
  visits: Visit[];
}

/** An in-flight insertion. `lo`/`hi` bracket the slot the city belongs in. */
export interface Placement {
  cityId: CityId;
  rating: number;
  lo: number;
  hi: number;
  asked: number;
}

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
