# Arrivals

Letterboxd, but for cities. Rate the places you've been, log every trip separately, and keep a
ranking that's built from comparisons rather than guesswork.

**Arrivals is a working title**, named for the arrival stamp in a passport and the board in an
airport. It replaced `Postmark`, which collided with ActiveCampaign's transactional email service —
a developer-facing product, and so the worst possible audience to share a name with.

Worth knowing if the name comes up again: the stamp-flavoured names are saturated by direct
competitors in exactly this category. **Stamped: Travel Tracker & Map**, **Stamp: Travel Tracker**,
**Stampie** and **WanderStamp** all already track places you've been, and **Passage** is a travel
app too. `Arrivals` and `Port of Entry` were the passport words left standing.

The trade-off: a common English word is hard to trademark and hard to search for. `Port of Entry` is
more ownable and more literally passport, but it's three words and shortens badly.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # ranking logic
npm run build    # typecheck + production build
```

## Where it's deployed

A copy of the build is served from the portfolio at `/arrivals/`. Two things make that work, and
both matter if you move it anywhere else:

- `base: "./"` in `vite.config.ts`, so asset paths are relative and survive any sub-path.
- `HashRouter` rather than `BrowserRouter`. GitHub Pages has no SPA fallback, so a real path like
  `/arrivals/cities` would 404 on refresh. The hash never reaches the server.

To update the copy in the portfolio: `npm run build`, then replace `public/arrivals/` there.

## The idea

Three decisions carry the design.

**A rating and a ranking are different things.** You give a city a star rating outright. But when
you land on a rating you've already given something else, the app asks which of the two you
preferred, and inserts the new city by binary search. Placing into a rating that holds *n* cities
costs `ceil(log2(n + 1))` questions — three for eight cities, four for sixteen — so it stays a
question or two in practice. The ordering that falls out is a real ranked list, not a pile of ties.

**You rate the city, but you log the trip.** Films get watched a hundred times a year; cities get
visited maybe three. A city-shaped log would be too quiet to be worth opening. So the unit is a
visit, and the MyPassport screen shows them in order, with repeat trips marked `↻ visit 2`.

**Cities are a finite, canonical catalogue.** That's the property Letterboxd relies on and
restaurant apps have to fight for. A few thousand cities from GeoNames or Wikidata and the
catalogue problem is solved.

## Layout

```
src/
  lib/ranking.ts        the insertion logic, pure and tested
  lib/storage.ts        the only file that knows where the log lives
  lib/lists.ts          list persistence
  state/                LogContext and ListsContext
  data/                 city catalogue, photo credits, seed data
  components/           Stars, CityCard, Stamp, ArrivalStamp, histogram, the flows
  screens/              Activity, Cities, Passport, Lists, ListPage, CityPage
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

**One loose end after the rename.** The identity was drawn for a postal name — the perforated edge
is a postage stamp, and the diagonal red-and-blue rule is an airmail envelope. The circular
cancellation mark survives the move intact, because a passport entry stamp genuinely looks like
that: a ring, the port of entry arced over the top, the date across the middle. The perforations and
the airmail stripe are the parts still arguing for the old name. Moving them to a visa-page
treatment — guilloche, a torn edge, a document number — would settle it, but that's a redesign
rather than a rename.

## State of it

Working: rating, the comparison flow, the ranking, the histogram, filters and sorts, the passport,
per-city pages, lists you can create and reorder, both themes, and persistence to `localStorage`.

Not built yet:

- **Accounts and a real social graph.** The feed and the friends' notes are invented. Swapping
  `lib/storage.ts` for a Supabase table is the whole migration for the log itself; the social half
  is a real build.
- **A real date picker.** Step 2 offers recent months and invents a day of the month.
- **Sharing a list.** Lists exist and are editable, but only in your own browser. Making one
  shareable is the point of them and needs the backend.
- **Your own photo per visit.** The better long-term answer to the licensing question below.

## Photos

All twelve are CC0 or attribution-only, and the credit renders on each city's page because CC BY
requires it to reach whoever is looking at the photo. Share-alike is deliberately excluded: it
obliges derivative works to carry the same licence, which is a problem once photos sit inside a
product. [CREDITS.md](CREDITS.md) has the full table and the rule for adding a city.

## The open question

Ratings bunch at the top. Nobody flies somewhere hoping to file it under two stars, so the upper
bands get long while the bottom stays empty, and the comparison work concentrates in a couple of
places. Beli avoids this because you eat somewhere mediocre every week.

The histogram on the Cities screen exists to make this visible rather than leave it as a hunch — it
shows the distribution and what share sits in the busiest band, and clicking a bar filters to it.
That instruments the problem; it doesn't solve it. If the top two bands do swallow everything once
there's real data, the fix is probably finer resolution up there rather than more stars overall.
