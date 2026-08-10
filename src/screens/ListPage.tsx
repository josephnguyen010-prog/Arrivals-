import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CityCard } from "../components/CityCard";
import { ListEditor } from "../components/ListEditor";
import { requireCity } from "../data/cities";
import { ratingOf, visitsFor } from "../lib/ranking";
import { useLists } from "../state/ListsContext";
import { useLog } from "../state/LogContext";

export function ListPage() {
  const { id = "" } = useParams();
  const { byId, update, remove } = useLists();
  const { log } = useLog();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const list = byId(id);

  if (!list) {
    return (
      <section className="screen">
        <Link className="back" to="/lists">
          ← All lists
        </Link>
        <p className="empty">That list has gone.</p>
      </section>
    );
  }

  const rated = list.cities.filter((cityId) => ratingOf(log, cityId) !== null);
  const missing = list.cities.length - rated.length;

  return (
    <section className="screen">
      <Link className="back" to="/lists">
        ← All lists
      </Link>

      <div className="list-head">
        <div>
          <p className="eyebrow">
            {list.cities.length} {list.cities.length === 1 ? "city" : "cities"} · {list.by}
          </p>
          <h1>{list.title}</h1>
          {list.blurb && <p className="lede">{list.blurb}</p>}
          <p className="empty" style={{ margin: 0 }}>
            {missing === 0
              ? "You've been to every city on this list."
              : `You've been to ${rated.length} of ${list.cities.length}.`}
          </p>
        </div>
        {list.mine && (
          <div className="list-actions">
            <button className="ghost" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button
              className="ghost danger"
              onClick={() => {
                remove(list.id);
                navigate("/lists");
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {list.cities.length === 0 ? (
        <p className="empty">No cities in this list yet.</p>
      ) : (
        <ol className="list-grid">
          {list.cities.map((cityId, index) => {
            const city = requireCity(cityId);
            return (
              <li key={cityId}>
                <span className="list-pos">{index + 1}</span>
                <CityCard
                  city={city}
                  to={`/city/${city.id}`}
                  rating={ratingOf(log, city.id)}
                  visits={visitsFor(log, city.id).length}
                />
              </li>
            );
          })}
        </ol>
      )}

      {list.count > list.cities.length && (
        <p className="note">
          <b>Seeded list.</b> This one claims {list.count} cities but only {list.cities.length} are in
          the catalogue so far.
        </p>
      )}

      {editing && (
        <ListEditor
          list={list}
          onClose={() => setEditing(false)}
          onSave={(patch) => {
            update(list.id, patch);
            setEditing(false);
          }}
        />
      )}
    </section>
  );
}
