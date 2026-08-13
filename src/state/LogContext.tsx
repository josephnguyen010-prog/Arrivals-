import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CityId, LogState, Visit } from "../types";
import { addVisit, finishPlacement, startPlacement, toggleWish } from "../lib/ranking";
import { clearLog, loadLog, saveLog } from "../lib/storage";
import type { Placement } from "../types";

interface LogContextValue {
  log: LogState;
  /**
   * Records a trip, and applies the placement that came with it. The placement
   * is null when the visit was logged without a rating: the city stays
   * unranked until you give it one.
   */
  commitVisit: (placement: Placement | null, visit: Omit<Visit, "id">) => void;
  /** Prepares an insertion; the flow drives it and hands back the result. */
  begin: (cityId: CityId, rating: number) => { state: LogState; placement: Placement };
  /** Applies a finished placement on its own, for re-rating an existing city. */
  applyPlacement: (placement: Placement) => void;
  /** Adds or removes a city from Departures. */
  toggleWishlist: (cityId: CityId) => void;
  /** Your review of the city. Blank clears it rather than storing an empty. */
  setReview: (cityId: CityId, text: string) => void;
  /** Forgets a city entirely: its rating and every visit to it. */
  removeCity: (cityId: CityId) => void;
  removeVisit: (visitId: string) => void;
  reset: () => void;
}

const LogContext = createContext<LogContextValue | null>(null);

export function LogProvider({ children }: { children: ReactNode }) {
  const [log, setLog] = useState<LogState>(loadLog);

  useEffect(() => {
    saveLog(log);
  }, [log]);

  const begin = useCallback(
    (cityId: CityId, rating: number) => startPlacement(log, cityId, rating),
    [log],
  );

  const commitVisit = useCallback((placement: Placement | null, visit: Omit<Visit, "id">) => {
    setLog((current) => {
      if (!placement) return addVisit(current, { ...visit, id: `v${Date.now()}` });
      // Re-derive the placement against the live log so the write can't be
      // based on a stale snapshot taken when the flow opened.
      const { state: cleaned } = startPlacement(current, placement.cityId, placement.rating);
      const placed = finishPlacement(cleaned, placement);
      return addVisit(placed, { ...visit, id: `v${Date.now()}` });
    });
  }, []);

  const applyPlacement = useCallback((placement: Placement) => {
    setLog((current) => {
      const { state: cleaned } = startPlacement(current, placement.cityId, placement.rating);
      return finishPlacement(cleaned, placement);
    });
  }, []);

  const toggleWishlist = useCallback((cityId: CityId) => {
    setLog((current) => toggleWish(current, cityId));
  }, []);

  const setReview = useCallback((cityId: CityId, text: string) => {
    setLog((current) => {
      const reviews = { ...current.reviews };
      const trimmed = text.trim();
      if (trimmed) reviews[cityId] = trimmed;
      else delete reviews[cityId];
      return { ...current, reviews };
    });
  }, []);

  const removeCity = useCallback((cityId: CityId) => {
    setLog((current) => {
      const { state: cleaned } = startPlacement(current, cityId, 0);
      const rated = { ...cleaned.rated };
      // startPlacement leaves an empty bucket behind for rating 0; drop it.
      delete rated["0"];
      return {
        ...cleaned,
        rated,
        visits: cleaned.visits.filter((visit) => visit.city !== cityId),
      };
    });
  }, []);

  const removeVisit = useCallback((visitId: string) => {
    setLog((current) => ({ ...current, visits: current.visits.filter((v) => v.id !== visitId) }));
  }, []);

  const reset = useCallback(() => {
    clearLog();
    setLog(loadLog());
  }, []);

  const value = useMemo(
    () => ({
      log,
      commitVisit,
      begin,
      applyPlacement,
      toggleWishlist,
      setReview,
      removeCity,
      removeVisit,
      reset,
    }),
    [log, commitVisit, begin, applyPlacement, toggleWishlist, setReview, removeCity, removeVisit, reset],
  );

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
}

export function useLog(): LogContextValue {
  const value = useContext(LogContext);
  if (!value) throw new Error("useLog must be used inside a LogProvider");
  return value;
}
