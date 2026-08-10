import { describe, expect, it } from "vitest";
import type { LogState } from "../types";
import {
  finishPlacement,
  nextOpponent,
  orderedIds,
  questionsLeft,
  rankOf,
  ratingOf,
  recordAnswer,
  startPlacement,
  visitOrdinals,
} from "./ranking";

const empty: LogState = { rated: {}, visits: [] };

/** Places a city by answering every duel with a fixed preference function. */
function place(
  state: LogState,
  cityId: string,
  rating: number,
  prefersChallenger: (opponent: string) => boolean,
) {
  let { state: next, placement } = startPlacement(state, cityId, rating);
  let opponent = nextOpponent(next, placement);
  while (opponent) {
    placement = recordAnswer(placement, prefersChallenger(opponent));
    opponent = nextOpponent(next, placement);
  }
  return { state: finishPlacement(next, placement), asked: placement.asked };
}

describe("placing a city", () => {
  it("asks nothing when the rating is empty", () => {
    const { state, asked } = place(empty, "tokyo", 5, () => true);
    expect(asked).toBe(0);
    expect(state.rated["5"]).toEqual(["tokyo"]);
  });

  it("puts the challenger on top when it wins every comparison", () => {
    let state = place(empty, "a", 4, () => true).state;
    state = place(state, "b", 4, () => true).state;
    state = place(state, "c", 4, () => true).state;
    expect(state.rated["4"]).toEqual(["c", "b", "a"]);
  });

  it("puts the challenger at the bottom when it loses every comparison", () => {
    let state = place(empty, "a", 4, () => false).state;
    state = place(state, "b", 4, () => false).state;
    state = place(state, "c", 4, () => false).state;
    expect(state.rated["4"]).toEqual(["a", "b", "c"]);
  });

  it("lands a city in the middle when it beats one and loses to another", () => {
    let state: LogState = { rated: { "4": ["best", "worst"] }, visits: [] };
    state = place(state, "middle", 4, (opponent) => opponent === "worst").state;
    expect(state.rated["4"]).toEqual(["best", "middle", "worst"]);
  });

  it("never asks more than ceil(log2(n + 1)) questions", () => {
    let state = empty;
    for (let i = 0; i < 15; i++) {
      const { state: next, asked } = place(state, `city${i}`, 3, (opponent) => opponent < `city${i}`);
      expect(asked).toBeLessThanOrEqual(Math.ceil(Math.log2(i + 1)));
      state = next;
    }
    expect(state.rated["3"]).toHaveLength(15);
  });
});

describe("re-rating a city", () => {
  it("moves it out of its old rating rather than duplicating it", () => {
    let state: LogState = { rated: { "5": ["tokyo"], "3": ["osaka"] }, visits: [] };
    state = place(state, "tokyo", 3, () => true).state;
    expect(state.rated["5"]).toEqual([]);
    expect(state.rated["3"]).toEqual(["tokyo", "osaka"]);
    expect(orderedIds(state)).toEqual(["tokyo", "osaka"]);
  });

  it("does not compare a city against itself", () => {
    const state: LogState = { rated: { "4": ["tokyo"] }, visits: [] };
    const { state: cleaned, placement } = startPlacement(state, "tokyo", 4);
    expect(nextOpponent(cleaned, placement)).toBeNull();
  });
});

describe("reading the ranking", () => {
  const state: LogState = { rated: { "5": ["a"], "4.5": ["b", "c"], "2": ["d"] }, visits: [] };

  it("orders by rating first, then by position inside it", () => {
    expect(orderedIds(state)).toEqual(["a", "b", "c", "d"]);
  });

  it("reports rank against every rated city", () => {
    expect(rankOf(state, "c")).toEqual({ pos: 3, total: 4 });
  });

  it("returns the rating a city was given", () => {
    expect(ratingOf(state, "b")).toBe(4.5);
    expect(ratingOf(state, "unrated")).toBeNull();
  });
});

describe("questionsLeft", () => {
  it("is zero once the bracket has closed", () => {
    expect(questionsLeft({ cityId: "x", rating: 4, lo: 2, hi: 2, asked: 3 })).toBe(0);
  });

  it("halves as the bracket narrows", () => {
    expect(questionsLeft({ cityId: "x", rating: 4, lo: 0, hi: 7, asked: 0 })).toBe(3);
    expect(questionsLeft({ cityId: "x", rating: 4, lo: 0, hi: 3, asked: 1 })).toBe(2);
  });
});

describe("visitOrdinals", () => {
  it("numbers repeat visits from the oldest forward", () => {
    const visits = [
      { id: "3", city: "hcmc", when: "Mar 2026", day: "12" },
      { id: "2", city: "tokyo", when: "Apr 2025", day: "01" },
      { id: "1", city: "hcmc", when: "Jan 2023", day: "02" },
    ];
    expect(visitOrdinals(visits)).toEqual({ "1": 1, "2": 1, "3": 2 });
  });
});
