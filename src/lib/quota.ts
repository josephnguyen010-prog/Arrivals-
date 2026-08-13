/**
 * Both of the things that store photos - spots and city photos - can fill
 * localStorage, and both need to say so rather than failing silently. The
 * budget is checked before the write so the message names the cause.
 */
export class StorageFullError extends Error {
  constructor(message = "There isn't room to save that photo.") {
    super(message);
    this.name = "StorageFullError";
  }
}

/**
 * Writes a value, or throws StorageFullError. The up-front size check catches
 * the case the browser would otherwise let through until some later write.
 */
export function writeCapped(key: string, payload: string, budgetBytes: number, message?: string): void {
  if (payload.length > budgetBytes) throw new StorageFullError(message);
  try {
    localStorage.setItem(key, payload);
  } catch {
    throw new StorageFullError(message);
  }
}
