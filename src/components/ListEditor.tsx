import { useState } from "react";
import { CITIES } from "../data/cities";
import { ratingOf } from "../lib/ranking";
import { useLog } from "../state/LogContext";
import type { CityId, CityList } from "../types";
import { CityPhoto } from "./CityPhoto";
import { Modal } from "./Modal";
import { Stars } from "./Stars";

interface ListEditorProps {
  /** Absent when making a new list. */
  list?: CityList;
  onSave: (patch: { title: string; blurb: string; cities: CityId[] }) => void;
  onClose: () => void;
}

/**
 * Order is the argument a list makes, so cities can be moved up and down
 * rather than just added and removed.
 */
export function ListEditor({ list, onSave, onClose }: ListEditorProps) {
  const { log } = useLog();
  const [title, setTitle] = useState(list?.title ?? "");
  const [blurb, setBlurb] = useState(list?.blurb ?? "");
  const [cities, setCities] = useState<CityId[]>(list?.cities ?? []);

  function toggle(id: CityId) {
    setCities((current) =>
      current.includes(id) ? current.filter((cityId) => cityId !== id) : [...current, id],
    );
  }

  function move(index: number, delta: number) {
    setCities((current) => {
      const next = [...current];
      const target = index + delta;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  const canSave = title.trim().length > 0 && cities.length > 0;

  return (
    <Modal onClose={onClose} labelledBy="list-editor-title">
      <h2 id="list-editor-title">{list ? "Edit list" : "New list"}</h2>
      <h3>What belongs together?</h3>

      <label className="field">
        <span>Title</span>
        <input
          className="search"
          value={title}
          autoFocus
          placeholder="Great at 2am"
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label className="field">
        <span>The argument</span>
        <input
          className="search"
          value={blurb}
          placeholder="Judged strictly on what's open after the trains stop."
          onChange={(event) => setBlurb(event.target.value)}
        />
      </label>

      {cities.length > 0 && (
        <>
          <p className="field-label">In the list, in order</p>
          <ol className="ordered-picks">
            {cities.map((id, index) => {
              const city = CITIES.find((candidate) => candidate.id === id);
              if (!city) return null;
              return (
                <li key={id}>
                  <span className="list-pos small">{index + 1}</span>
                  <CityPhoto city={city} />
                  <b>{city.name}</b>
                  <span className="reorder">
                    <button
                      className="ghost"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label={`Move ${city.name} up`}
                    >
                      ↑
                    </button>
                    <button
                      className="ghost"
                      onClick={() => move(index, 1)}
                      disabled={index === cities.length - 1}
                      aria-label={`Move ${city.name} down`}
                    >
                      ↓
                    </button>
                    <button className="ghost" onClick={() => toggle(id)} aria-label={`Remove ${city.name}`}>
                      ✕
                    </button>
                  </span>
                </li>
              );
            })}
          </ol>
        </>
      )}

      <p className="field-label">Add cities</p>
      <div className="options">
        {CITIES.filter((city) => !cities.includes(city.id)).map((city) => (
          <button key={city.id} className="option" onClick={() => toggle(city.id)}>
            <CityPhoto city={city} />
            <span>
              <b>{city.name}</b>
              <small>{city.country}</small>
            </span>
            <span className="right">
              <Stars value={ratingOf(log, city.id)} />
            </span>
          </button>
        ))}
      </div>

      <div className="sheet-foot">
        <button className="ghost" onClick={onClose}>
          Cancel
        </button>
        <button
          className="log-btn"
          disabled={!canSave}
          onClick={() => onSave({ title, blurb, cities })}
        >
          {list ? "Save changes" : "Create list"}
        </button>
      </div>
    </Modal>
  );
}
