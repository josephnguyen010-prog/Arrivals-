# Postmark

Letterboxd, but for cities. Rate the places you've been, log every trip separately, and keep a
ranking that's built from comparisons rather than guesswork.

**Postmark is a working title.** The name is taken — [postmarkapp.com](https://postmarkapp.com) is
ActiveCampaign's transactional email service, well known among developers, which is the worst
audience to collide with. `Franked` is the leading alternative; the app already says "UNFRANKED"
on cities you haven't been to.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # ranking logic
npm run build    # typecheck + production build
```

## The idea

Three decisions carry the design.

**A rating and a ranking are different things.** You give a city a star rating outright. But when
you land on a rating you've already given something else, the app asks which of the two you
preferred, and inserts the new city by binary search. Placing into a rating that holds *n* cities
costs `ceil(log2(n + 1))` questions — three for eight cities, four for sixteen — so it stays a
question or two in practice. The ordering that falls out is a real ranked list, not a pile of ties.

**You rate the city, but you log the trip.** Films get watched a hundred times a year; cities get
visited maybe three. A city-shaped log would be too quiet to be worth opening. So the unit is a
visit, and the Passport screen shows them in order, with repeat trips marked `↻ visit 2`.

**Cities are a finite, canonical catalogue.** That's the property Letterboxd relies on and
restaurant apps have to fight for. A few thousand cities from GeoNames or Wikidata and the
catalogue problem is solved.

## Layout

```
src/
  lib/ranking.ts        the insertion logic, pure and tested
  lib/storage.ts        the only file that knows where the log lives
  state/LogContext.tsx  the store
  data/                 city catalogue and seed data
  components/           Stars, CityCard, Stamp, Postmark, the log flow
  screens/              Activity, Cities, Passport, Lists, CityPage
  styles/tokens.css     the palette, both themes
```

`ranking.ts` is pure functions over a `LogState`, so the interesting behaviour is testable without
rendering anything. `npm test` covers placement at the top, bottom and middle of a rating, the
question-count bound, re-rating a city, and the case where a city would otherwise be compared
against itself.

## Design

Airmail. Red and blue together as a barber stripe rather than a single accent colour, on kraft
paper or navy ink. Palatino for the wordmark, Helvetica for the interface, and Courier for
anything that's data — dates, country codes, ratings — which is the vernacular of customs forms
and luggage tags. Both themes are first-class; the toggle in the top bar overrides the OS setting.

The perforated stamp is the one loud element, so it's kept to the city page and the moment a visit
is logged. Everywhere else cities are quiet rectangles, because a grid is for scanning.

## State of it

Working: rating, the comparison flow, the ranking, filters and sorts, the passport, per-city pages,
both themes, and persistence to `localStorage`.

Not built yet:

- **Accounts and a real social graph.** The feed and the friends' notes are invented. Swapping
  `lib/storage.ts` for a Supabase table is the whole migration for the log itself; the social half
  is a real build.
- **List detail pages.** Lists are the most shareable object here and currently the least developed —
  a list card links to its first city.
- **A real date picker.** Step 2 offers recent months and invents a day of the month.
- **Photo licensing.** See [CREDITS.md](CREDITS.md); several images are share-alike, which needs
  resolving before this is public.

## The open question

Ratings bunch at the top. Nobody flies somewhere hoping to file it under two stars, so 4 and 4.5
get long while the bottom stays empty, and all the comparison work concentrates in two bands.
Beli avoids this because you eat somewhere mediocre every week. Worth watching once there's
enough real data to see the shape.
