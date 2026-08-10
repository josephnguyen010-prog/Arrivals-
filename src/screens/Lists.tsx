import { Link } from "react-router-dom";
import { requireCity } from "../data/cities";
import { LISTS } from "../data/seed";

export function Lists() {
  return (
    <section className="screen">
      <h2>Collections</h2>
      <p className="lede">
        The shareable object. A list is a set of cities plus an argument for why they belong together.
      </p>
      <div className="lists">
        {LISTS.map((list) => (
          <Link className="list-card" to={`/city/${list.cities[0]}`} key={list.id}>
            <div className="strip">
              {list.cities.map((id) => (
                <img key={id} src={requireCity(id).photo} alt="" loading="lazy" />
              ))}
            </div>
            <h3>{list.title}</h3>
            <p>{list.blurb}</p>
            <span className="by">
              {list.count} cities · {list.by}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
