import { describe, expect, it } from "vitest";
import { inlineCompletion, searchCities } from "./search";
import type { City } from "../types";

const city = (id: string, name: string, country: string): City => ({
  id,
  name,
  country,
  cc: id.toUpperCase(),
  region: "Asia",
  photo: "",
});

const CITIES = [
  city("hcmc", "Ho Chi Minh City", "Vietnam"),
  city("tokyo", "Tokyo", "Japan"),
  city("osaka", "Osaka", "Japan"),
  city("porto", "Porto", "Portugal"),
  city("lisbon", "Lisbon", "Portugal"),
];

const names = (term: string) => searchCities(CITIES, term).map((match) => match.city.name);

describe("searchCities", () => {
  it("returns everything for an empty term", () => {
    expect(names("")).toHaveLength(CITIES.length);
  });

  it("puts a name that starts with the term first", () => {
    expect(names("por")[0]).toBe("Porto");
  });

  it("ranks a start-of-name match above a mid-name one", () => {
    // "Osaka" contains "saka"; nothing starts with it.
    expect(names("o")[0]).toBe("Osaka");
  });

  it("finds a match at the start of a later word", () => {
    expect(names("chi")).toContain("Ho Chi Minh City");
  });

  it("falls back to the country", () => {
    expect(names("japan").sort()).toEqual(["Osaka", "Tokyo"]);
  });

  it("reports where the name matched so it can be highlighted", () => {
    const [first] = searchCities(CITIES, "chi");
    expect(first.city.name.slice(first.at![0], first.at![1])).toBe("Chi");
  });

  it("does not report a span when only the country matched", () => {
    const [first] = searchCities(CITIES, "portugal");
    expect(first.at).toBeUndefined();
  });

  it("is case insensitive and ignores surrounding space", () => {
    expect(names("  TOK  ")[0]).toBe("Tokyo");
  });

  it("returns nothing for a term that matches neither", () => {
    expect(names("zzz")).toEqual([]);
  });
});

describe("inlineCompletion", () => {
  const complete = (term: string) => inlineCompletion(searchCities(CITIES, term), term);

  it("suggests the rest of the best match", () => {
    expect(complete("tok")).toBe("yo");
    expect(complete("por")).toBe("to");
  });

  it("keeps the casing of the real name, not what was typed", () => {
    expect(complete("ho chi")).toBe(" Minh City");
  });

  it("suggests nothing on an empty term", () => {
    expect(complete("")).toBe("");
  });

  it("suggests nothing once the name is fully typed", () => {
    expect(complete("Tokyo")).toBe("");
  });

  it("suggests nothing when the best match doesn't start with the term", () => {
    // Only the country matches, so there is nothing to complete.
    expect(complete("japan")).toBe("");
  });

  it("suggests nothing when nothing matches", () => {
    expect(complete("zzz")).toBe("");
  });
});
