import { useState } from "react";
import type { ChangeEvent } from "react";
import { MAX_EDGE, downscaleImage } from "../lib/images";
import { StorageFullError } from "../lib/quota";
import { usePhotos } from "../state/PhotosContext";
import type { City } from "../types";
import { Modal } from "./Modal";

interface CityPhotoEditorProps {
  city: City;
  onClose: () => void;
}

/**
 * Swapping the shipped photo for one of your own. The picture is the thing you
 * actually recognise a city by in a grid, and yours is better than a stock
 * skyline — so this replaces it everywhere at once rather than only here.
 */
export function CityPhotoEditor({ city, onClose }: CityPhotoEditorProps) {
  const { photoFor, isYours, set, reset } = usePhotos();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const yours = isYours(city.id);

  async function onPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      set(city.id, await downscaleImage(file));
    } catch (caught) {
      setError(
        caught instanceof StorageFullError
          ? caught.message
          : "That image could not be read. Try a JPEG or PNG.",
      );
    } finally {
      setBusy(false);
      // Cleared so picking the same file twice still fires a change event.
      event.target.value = "";
    }
  }

  return (
    <Modal onClose={onClose} labelledBy="city-photo-title">
      <h2 id="city-photo-title">{city.name}</h2>
      <h3>Photo</h3>
      <p className="hint">
        {yours
          ? "This is your photo. It shows on the card, the stamp and your passport."
          : "The default is a Wikimedia photograph. Use one of your own and it replaces it everywhere."}
      </p>

      <div className="photo-preview">
        <img src={photoFor(city)} alt={`${city.name} as it currently appears`} />
        <span className="photo-tag">{yours ? "Yours" : "Default"}</span>
      </div>

      <label className="filepick">
        <input type="file" accept="image/*" onChange={onPick} disabled={busy} />
        <span>{busy ? "Shrinking…" : yours ? "Choose a different photo" : "Choose a photo"}</span>
      </label>
      <p className="hint" style={{ margin: "10px 0 0" }}>
        Scaled down to {MAX_EDGE}px and kept in this browser, so a phone photo costs about 100KB.
      </p>

      {error && <p className="field-error block">{error}</p>}

      <div className="sheet-foot">
        {yours ? (
          <button
            className="ghost danger"
            onClick={() => {
              setError(null);
              reset(city.id);
            }}
          >
            Put the default back
          </button>
        ) : (
          <span />
        )}
        <button className="ghost" onClick={onClose}>
          Done
        </button>
      </div>
    </Modal>
  );
}
