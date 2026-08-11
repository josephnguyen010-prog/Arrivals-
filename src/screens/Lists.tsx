import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListEditor } from "../components/ListEditor";
import { requireCity } from "../data/cities";
import { useLists } from "../state/ListsContext";
import type { CityList } from "../types";

export function Lists() {
  const { mine, followed, create } = useLists();
  const [making, setMaking] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="screen">
      <div className="section-head">
        <div>
          <h2 style={{ border: "none", margin: 0, padding: 0 }}>Your lists</h2>
        </div>
        <button className="log-btn" onClick={() => setMaking(true)}>
          New list
        </button>
      </div>
      <p className="lede">
        The shareable object. A list is a set of cities plus an argument for why they belong
        together, and the order is part of the argument.
      </p>

      {mine.length === 0 ? (
        <p className="empty">
          You haven't made one yet. A good list is narrower than "favourites".
        </p>
      ) : (
        <div className="lists">
          {mine.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      )}

      <h2 style={{ marginTop: "36px" }}>From people you follow</h2>
      <div className="lists">
        {followed.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>

      {making && (
        <ListEditor
          onClose={() => setMaking(false)}
          onSave={({ title, blurb, cities }) => {
            const list = create(title, blurb, cities);
            setMaking(false);
            navigate(`/list/${list.id}`);
          }}
        />
      )}
    </section>
  );
}

function ListCard({ list }: { list: CityList }) {
  return (
    <Link className="list-card" to={`/list/${list.id}`}>
      <div className="strip">
        {list.cities.slice(0, 5).map((id) => (
          <img key={id} src={requireCity(id).photo} alt="" loading="lazy" />
        ))}
        {list.cities.length === 0 && <div className="strip-empty" />}
      </div>
      <h3>{list.title}</h3>
      {list.blurb && <p>{list.blurb}</p>}
      <span className="by">
        {list.count} {list.count === 1 ? "city" : "cities"} · {list.by}
      </span>
    </Link>
  );
}
