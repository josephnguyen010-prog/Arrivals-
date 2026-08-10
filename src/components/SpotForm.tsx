import { useState } from "react";
import type { ChangeEvent } from "react";
import { StorageFullError, downscaleImage, safeUrl } from "../lib/spots";
import { useSpots } from "../state/SpotsContext";
import { SPOT_CATEGORIES } from "../types";
import type { City, SpotCategory } from "../types";
import { Modal } from "./Modal";

interface SpotFormProps {
  city: City;
  onClose: () => void;
}

export function SpotForm({ city, onClose }: SpotFormProps) {
  const { add } = useSpots();
  const [category, setCategory] = useState<SpotCategory>(SPOT_CATEGORIES[0]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState<string | undefined>();
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
    try {
      add({
        city: city.id,
        category,
        name: name.trim(),
        note: note.trim() || undefined,
        url: resolvedLink ?? undefined,
        photo,
      });
      onClose();
    } catch (caught) {
      setError(caught instanceof StorageFullError ? caught.message : "That could not be saved.");
    }
  }

  return (
    <Modal onClose={onClose} labelledBy="spot-form-title">
      <h2 id="spot-form-title">{city.name}</h2>
      <h3>Add a spot</h3>
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
        <span>Link — maps, a menu, anything</span>
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
        <button className="ghost" onClick={onClose}>
          Cancel
        </button>
        <button className="log-btn" disabled={!canSave} onClick={onSave}>
          Add spot
        </button>
      </div>
    </Modal>
  );
}
