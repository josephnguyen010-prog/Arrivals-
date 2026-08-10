import type { CityId, Spot } from "../types";

const KEY = "arrivals.spots.v1";

/**
 * localStorage is a few megabytes for the whole origin, and photos are the
 * only thing here big enough to threaten it, so they are downscaled before
 * they are ever stored and the total is checked before a write.
 */
export const MAX_EDGE = 900;
export const JPEG_QUALITY = 0.72;
const BUDGET_BYTES = 3_500_000;

export function loadSpots(): Spot[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (spot): spot is Spot =>
        spot && typeof spot.id === "string" && typeof spot.city === "string" && typeof spot.name === "string",
    );
  } catch {
    return [];
  }
}

export class StorageFullError extends Error {
  constructor() {
    super("There isn't room to save that photo. Remove a spot photo and try again.");
    this.name = "StorageFullError";
  }
}

export function saveSpots(spots: Spot[]): void {
  const payload = JSON.stringify(spots);
  // Checked up front so the caller can explain, rather than failing silently
  // the way a swallowed quota error would.
  if (payload.length > BUDGET_BYTES) throw new StorageFullError();
  try {
    localStorage.setItem(KEY, payload);
  } catch {
    throw new StorageFullError();
  }
}

export function spotsForCity(spots: Spot[], city: CityId): Spot[] {
  return spots.filter((spot) => spot.city === city);
}

/**
 * Accepts what someone actually pastes — usually a bare host, sometimes a full
 * Maps URL — and returns it only if it resolves to http(s). Anything else,
 * `javascript:` most importantly, comes back null and is never rendered.
 */
export function safeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const candidate = /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (!url.hostname.includes(".")) return null;
  return url.toString();
}

/** What to show as the link text: the host, without the www. */
export function linkLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Reads a picked image, scales its longest edge down to MAX_EDGE and re-encodes
 * it as JPEG. A phone photo is several megabytes; this lands around 60-120KB,
 * which is what makes storing it locally viable at all.
 */
export async function downscaleImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("Could not read that image.");
  }
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}

export function makeSpot(spot: Omit<Spot, "id">): Spot {
  return { ...spot, id: `s${Date.now()}${Math.random().toString(36).slice(2, 6)}` };
}
