import type { CityId, CityList } from "../types";

const KEY = "postmark.lists.v1";

/** Lists you made, kept beside the ones from people you follow. */
export function loadMyLists(): CityList[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (list): list is CityList =>
        list && typeof list.id === "string" && typeof list.title === "string" && Array.isArray(list.cities),
    );
  } catch {
    return [];
  }
}

export function saveMyLists(lists: CityList[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(lists));
  } catch {
    // Storage unavailable; the session still works.
  }
}

export function makeList(title: string, blurb: string, cities: CityId[]): CityList {
  return {
    id: `my-${Date.now()}`,
    title: title.trim(),
    blurb: blurb.trim(),
    by: "@joseph",
    count: cities.length,
    cities,
    mine: true,
  };
}
