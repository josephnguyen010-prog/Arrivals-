import { useState } from "react";
import type { ChangeEvent } from "react";
import { downscaleImage } from "../lib/images";
import { StorageFullError } from "../lib/quota";
import { safeUrl } from "../lib/spots";
import { useSpots } from "../state/SpotsContext";
import { SPOT_CATEGORIES } from "../types";
import type { City, Spot, SpotCategory } from "../types";
import { Modal } from "./Modal";

interface SpotFormProps {
  city: City;
  /** Given, the form edits that spot in place instead of adding a new one. */
  spot?: Spot;
  onClose: () => void;
}

export function SpotForm({ city, spot, onClose }: SpotFormProps) {
  const { add, update, remove } = useSpots();
  const [category, setCategory] = useState<SpotCategory>(spot?.category ?? SPOT_CATEGORIES[0]);
  const [name, setName] = useState(spot?.name ?? "");
  const [link, setLink] = useState(spot?.url ?? "");
  const [note, setNote] = useState(spot?.note ?? "");
  const [photo, setPhoto] = useState<string | undefined>(spot?.photo);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const linkTouched = link.trim().length > 0;
  const resolvedLink = linkTouched ? safeUrl(link) : null;
  const linkBad = linkTouched && resolvedLink === null;
  const canSave = name.trim().length > 0 && !linkBad && !busy;

  async function onPickPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      setPhoto(await downscaleImage(file));
    } catch {
      setError("That image could not be read. Try a JPEG or PNG.");
    } finally {
      setBusy(false);
    }
  }

  function onSave() {
    setError(null);
    const next = {
      city: city.id,
      category,
      name: name.trim(),
      note: note.trim() || undefined,
      url: resolvedLink ?? undefined,
      photo,
    };
    try {
      if (spot) update(spot.id, next);
      else add(next);
      onClose();
    } catch (caught) {
      setError(caught instanceof StorageFullError ? caught.message : "That could not be saved.");
    }
  }

  return (
    <Modal onClose={onClose} labelledBy="spot-form-title">
      <h2 id="spot-form-title">{city.name}</h2>
      <h3>{spot ? "Edit this spot" : "Add a spot"}</h3>
      <p className="hint">
        The thing you would actually tell someone about. A link or a photo is optional.
      </p>

      <p className="field-label">What kind</p>
      <div className="chips">
        {SPOT_CATEGORIES.map((option) => (
          <button
            key={option}
            className={option === category ? "chip on" : "chip"}
            aria-pressed={option === category}
            onClick={() => setCategory(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <label className="field">
        <span>Name</span>
        <input
          className="search"
          value={name}
          autoFocus
          placeholder={category === "Skip it" ? "The one everybody queues for" : "Bánh mì Huỳnh Hoa"}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label className="field">
        <span>Link (maps, a menu, anything)</span>
        <input
          className={linkBad ? "search bad" : "search"}
          value={link}
          placeholder="maps.app.goo.gl/…"
          onChange={(event) => setLink(event.target.value)}
        />
        {linkBad && <em className="field-error">That is not a web address. It needs to start with http or https.</em>}
      </label>

      <label className="field">
        <span>Note</span>
        <input
          className="search"
          value={note}
          placeholder="Go before eleven or you'll queue"
          onChange={(event) => setNote(event.target.value)}
        />
      </label>

      <p className="field-label">Photo</p>
      {photo ? (
        <div className="photo-pick">
          <img src={photo} alt="" />
          <button className="ghost" onClick={() => setPhoto(undefined)}>
            Remove
          </button>
        </div>
      ) : (
        <label className="filepick">
          <input type="file" accept="image/*" onChange={onPickPhoto} />
          <span>{busy ? "Shrinking…" : "Choose a photo"}</span>
        </label>
      )}

      {error && <p className="field-error block">{error}</p>}

      <div className="sheet-foot">
        {spot ? (
          <button
            className="ghost danger"
            onClick={() => {
              remove(spot.id);
              onClose();
            }}
          >
            Remove this spot
          </button>
        ) : (
          <span />
        )}
        <span className="foot-pair">
          <button className="ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="log-btn" disabled={!canSave} onClick={onSave}>
            {spot ? "Save" : "Add spot"}
          </button>
        </span>
      </div>
    </Modal>
  );
}
