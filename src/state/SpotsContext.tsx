import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { loadSpots, makeSpot, saveSpots, spotsForCity } from "../lib/spots";
import type { CityId, Spot } from "../types";

interface SpotsContextValue {
  spots: Spot[];
  forCity: (city: CityId) => Spot[];
  /** Throws StorageFullError if the photo will not fit. */
  add: (spot: Omit<Spot, "id">) => void;
  remove: (id: string) => void;
}

const SpotsContext = createContext<SpotsContextValue | null>(null);

export function SpotsProvider({ children }: { children: ReactNode }) {
  const [spots, setSpots] = useState<Spot[]>(loadSpots);

  /* Saved inside the action rather than in an effect, so a quota failure can
     be thrown back to the form that caused it instead of being swallowed. */
  const add = useCallback((spot: Omit<Spot, "id">) => {
    const next = [makeSpot(spot), ...spots];
    saveSpots(next);
    setSpots(next);
  }, [spots]);

  const remove = useCallback((id: string) => {
    const next = spots.filter((spot) => spot.id !== id);
    saveSpots(next);
    setSpots(next);
  }, [spots]);

  const value = useMemo<SpotsContextValue>(
    () => ({ spots, forCity: (city) => spotsForCity(spots, city), add, remove }),
    [spots, add, remove],
  );

  return <SpotsContext.Provider value={value}>{children}</SpotsContext.Provider>;
}

export function useSpots(): SpotsContextValue {
  const value = useContext(SpotsContext);
  if (!value) throw new Error("useSpots must be used inside a SpotsProvider");
  return value;
}
