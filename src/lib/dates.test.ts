import { describe, expect, it } from "vitest";
import { addDays, addMonths, daysInMonth, startOfDay } from "./dates";

/** Readable assertions without pulling a formatter into the source. */
function iso(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${String(date.getDate()).padStart(2, "0")}`;
}

describe("date helpers", () => {
  it("startOfDay drops the time", () => {
    const noon = new Date(2026, 7, 12, 13, 45, 30);
    expect(startOfDay(noon).getTime()).toBe(new Date(2026, 7, 12).getTime());
  });

  it("daysInMonth knows the short months and leap years", () => {
    expect(daysInMonth(2024, 1)).toBe(29);
    expect(daysInMonth(2023, 1)).toBe(28);
    expect(daysInMonth(2026, 8)).toBe(30);
  });

  it("addDays rolls into the next month", () => {
    expect(iso(addDays(new Date(2026, 7, 31), 1))).toBe("2026-09-01");
    expect(iso(addDays(new Date(2026, 7, 1), -1))).toBe("2026-07-31");
  });

  it("addMonths clamps the day rather than rolling forwards", () => {
    // The 31st of March back one month is not the 31st of February.
    expect(iso(addMonths(new Date(2026, 2, 31), -1))).toBe("2026-02-28");
    expect(iso(addMonths(new Date(2026, 0, 31), 1))).toBe("2026-02-28");
  });

  it("addMonths crosses the year", () => {
    expect(iso(addMonths(new Date(2026, 0, 15), -1))).toBe("2025-12-15");
    expect(iso(addMonths(new Date(2026, 7, 15), -12))).toBe("2025-08-15");
  });
});
