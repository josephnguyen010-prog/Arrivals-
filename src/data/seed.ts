import type { CityList, FeedItem, LogState } from "../types";

/** What a lived-in account looks like, so the app isn't empty on first run. */
export const SEED_LOG: LogState = {
  rated: {
    "5": ["hcmc"],
    "4.5": ["tokyo", "ist"],
    "4": ["lisbon"],
    "3.5": ["taipei"],
    "3": ["cph", "osaka"],
    "2.5": ["bsas"],
    "2": ["cdmx"],
  },
  visits: [
    { id: "v1", city: "hcmc", when: "Mar 2026", day: "12" },
    { id: "v2", city: "lisbon", when: "Feb 2026", day: "28" },
    { id: "v3", city: "tokyo", when: "Jan 2026", day: "06" },
    { id: "v4", city: "hcmc", when: "Nov 2025", day: "19" },
    { id: "v5", city: "osaka", when: "Apr 2025", day: "03" },
    { id: "v6", city: "tokyo", when: "Apr 2025", day: "01" },
    { id: "v7", city: "ist", when: "Sep 2024", day: "22" },
    { id: "v8", city: "taipei", when: "Feb 2024", day: "14" },
    { id: "v9", city: "cph", when: "Aug 2023", day: "09" },
    { id: "v10", city: "cdmx", when: "May 2023", day: "17" },
    { id: "v11", city: "hcmc", when: "Jan 2023", day: "02" },
    { id: "v12", city: "lisbon", when: "Jul 2021", day: "24" },
    { id: "v13", city: "bsas", when: "Dec 2019", day: "30" },
  ],
  wishlist: ["seoul", "marra", "porto"],
};

/** Fictional accounts. A real feed comes from whoever you follow. */
export const FEED: FeedItem[] = [
  {
    id: "f1",
    who: "Mai Tran",
    handle: "@mai.tr",
    city: "ist",
    rating: 4.5,
    when: "2d",
    note: "Stayed in Kadıköy and only crossed for the mosques. The ferry is the whole city — twenty minutes, a glass of tea, and you're somewhere with a different accent.",
    tags: ["Second visit", "Went alone", "10 days"],
  },
  {
    id: "f2",
    who: "Dieter Falk",
    handle: "@dieter",
    city: "cph",
    rating: 3,
    when: "4d",
    note: "Faultless and a little airless. Every bike lane works. I kept waiting to be surprised and mostly wasn't, which is its own kind of information.",
    tags: ["First visit", "Work trip", "4 days"],
  },
  {
    id: "f3",
    who: "Noor Haddad",
    handle: "@noor_",
    city: "cdmx",
    rating: 5,
    when: "1w",
    note: "Roma Norte will flatten your budget, so eat where the queue is longest and standing up. Three weeks and I still hadn't repeated a neighbourhood.",
    tags: ["First visit", "3 weeks"],
  },
  {
    id: "f4",
    who: "Mai Tran",
    handle: "@mai.tr",
    city: "porto",
    rating: 3.5,
    when: "1w",
    note: "Smaller than I'd built it up to be, which turned out to be the point. Two days is enough and two days is lovely.",
    tags: ["First visit", "Weekend"],
  },
  {
    id: "f5",
    who: "Sam Okafor",
    handle: "@sokafor",
    city: "taipei",
    rating: 4.5,
    when: "2w",
    note: "Went in for the food and stayed for how easy it is. Nobody warns you that the whole island is ninety minutes wide by train.",
    tags: ["Second visit", "2 weeks"],
  },
];

export const LISTS: CityList[] = [
  {
    id: "l1",
    title: "Cities that are better in the rain",
    by: "@mai.tr",
    count: 9,
    blurb: "Ranked by how much the weather improves them.",
    cities: ["porto", "tokyo", "cph", "lisbon", "seoul"],
  },
  {
    id: "l2",
    title: "48 hours is genuinely enough",
    by: "@dieter",
    count: 14,
    blurb: "No guilt, no unfinished business. Home on Sunday.",
    cities: ["porto", "cph", "osaka", "lisbon", "bsas"],
  },
  {
    id: "l3",
    title: "Where I'd go back on my own money",
    by: "@noor_",
    count: 6,
    blurb: "Not the best cities. The ones I miss.",
    cities: ["cdmx", "ist", "hcmc", "marra", "taipei"],
  },
  {
    id: "l4",
    title: "Great at 2am",
    by: "@sokafor",
    count: 11,
    blurb: "Judged strictly on what's open after the trains stop.",
    cities: ["seoul", "taipei", "hcmc", "osaka", "ist"],
  },
];
