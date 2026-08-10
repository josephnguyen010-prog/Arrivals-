import { Link } from "react-router-dom";
import { CityCard } from "../components/CityCard";
import { Stars } from "../components/Stars";
import { requireCity } from "../data/cities";
import { FEED } from "../data/seed";

export function Activity() {
  return (
    <section className="screen">
      <h2>From people you follow</h2>
      <div className="feed">
        {FEED.map((item) => {
          const city = requireCity(item.city);
          return (
            <article className="entry" key={item.id}>
              <Link to={`/city/${city.id}`} aria-label={`Open ${city.name}`}>
                <CityCard city={city} rating={item.rating} />
              </Link>
              <div>
                <div className="who-line">
                  <b>{item.who}</b>
                  <span className="handle">{item.handle}</span>
                  <span className="when">{item.when} ago</span>
                </div>
                <h3>
                  {city.name}
                  <Stars value={item.rating} size={15} />
                </h3>
                <p>{item.note}</p>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
