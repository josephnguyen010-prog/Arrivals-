import { describe, expect, it } from "vitest";
import { CITIES } from "./cities";
import { CITY_FACTS, factsFor } from "./facts";

describe("city facts", () => {
  it("covers every city in the catalogue", () => {
    const missing = CITIES.filter((city) => !factsFor(city.id)).map((city) => city.id);
    expect(missing).toEqual([]);
  });

  it("has no entry for a city that doesn't exist", () => {
    const ids = new Set(CITIES.map((city) => city.id));
    const orphans = Object.keys(CITY_FACTS).filter((id) => !ids.has(id));
    expect(orphans).toEqual([]);
  });

  it("fills in every field for every city", () => {
    for (const city of CITIES) {
      const facts = factsFor(city.id);
      expect(facts, city.id).toBeDefined();
      expect(facts!.history.length, city.id).toBeGreaterThan(0);
      expect(facts!.fact.length, city.id).toBeGreaterThan(0);
      // Two is thin but honest; three is the target. Zero is a hole.
      expect(facts!.dishes.length, city.id).toBeGreaterThanOrEqual(2);
      expect(facts!.landmarks.length, city.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("does not repeat an entry inside a column", () => {
    for (const city of CITIES) {
      const facts = factsFor(city.id)!;
      for (const column of [facts.dishes, facts.landmarks]) {
        expect(new Set(column).size, city.id).toBe(column.length);
      }
    }
  });

  it("does not give two cities the same fun fact", () => {
    const facts = CITIES.map((city) => factsFor(city.id)!.fact);
    expect(new Set(facts).size).toBe(facts.length);
  });
});
