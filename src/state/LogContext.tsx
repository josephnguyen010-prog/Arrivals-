import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CityId, LogState, Visit } from "../types";
import { addVisit, finishPlacement, startPlacement, toggleWish } from "../lib/ranking";
import { clearLog, loadLog, saveLog } from "../lib/storage";
import type { Placement } from "../types";

interface LogContextValue {
  log: LogState;
  /** Applies a finished placement and records the trip that prompted it. */
  commitVisit: (placement: Placement, visit: Omit<Visit, "id">) => void;
  /** Prepares an insertion; the flow drives it and hands back the result. */
  begin: (cityId: CityId, rating: number) => { state: LogState; placement: Placement };
  /** Adds or removes a city from Departures. */
  toggleWishlist: (cityId: CityId) => void;
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

  const commitVisit = useCallback((placement: Placement, visit: Omit<Visit, "id">) => {
    setLog((current) => {
      // Re-derive the placement against the live log so the write can't be
      // based on a stale snapshot taken when the flow opened.
      const { state: cleaned } = startPlacement(current, placement.cityId, placement.rating);
      const placed = finishPlacement(cleaned, placement);
      return addVisit(placed, { ...visit, id: `v${Date.now()}` });
    });
  }, []);

  const toggleWishlist = useCallback((cityId: CityId) => {
    setLog((current) => toggleWish(current, cityId));
  }, []);

  const reset = useCallback(() => {
    clearLog();
    setLog(loadLog());
  }, []);

  const value = useMemo(
    () => ({ log, commitVisit, begin, toggleWishlist, reset }),
    [log, commitVisit, begin, toggleWishlist, reset],
  );

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
}

export function useLog(): LogContextValue {
  const value = useContext(LogContext);
  if (!value) throw new Error("useLog must be used inside a LogProvider");
  return value;
}
