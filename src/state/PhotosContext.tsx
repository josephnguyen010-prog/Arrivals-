import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { loadPhotos, photoFor, savePhotos } from "../lib/photos";
import type { CityPhotos } from "../lib/photos";
import type { City, CityId } from "../types";

interface PhotosContextValue {
  /** What to show for a city: your photo if you set one, else the default. */
  photoFor: (city: City) => string;
  /** Whether the photo on screen is yours rather than the shipped one. */
  isYours: (id: CityId) => boolean;
  /** Throws StorageFullError when the photo will not fit. */
  set: (id: CityId, dataUrl: string) => void;
  /** Puts the city back to the photo it shipped with. */
  reset: (id: CityId) => void;
}

const PhotosContext = createContext<PhotosContextValue | null>(null);

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<CityPhotos>(loadPhotos);

  /* Saved inside the action rather than in an effect, so a quota failure can
     be thrown back to the form that caused it instead of being swallowed —
     the same arrangement as spots. */
  const set = useCallback(
    (id: CityId, dataUrl: string) => {
      const next = { ...photos, [id]: dataUrl };
      savePhotos(next);
      setPhotos(next);
    },
    [photos],
  );

  const reset = useCallback(
    (id: CityId) => {
      const next = { ...photos };
      delete next[id];
      savePhotos(next);
      setPhotos(next);
    },
    [photos],
  );

  const value = useMemo<PhotosContextValue>(
    () => ({
      photoFor: (city) => photoFor(photos, city),
      isYours: (id) => photos[id] !== undefined,
      set,
      reset,
    }),
    [photos, set, reset],
  );

  return <PhotosContext.Provider value={value}>{children}</PhotosContext.Provider>;
}

export function usePhotos(): PhotosContextValue {
  const value = useContext(PhotosContext);
  if (!value) throw new Error("usePhotos must be used inside a PhotosProvider");
  return value;
}
