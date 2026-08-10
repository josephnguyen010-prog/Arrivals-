import { useLog } from "../state/LogContext";
import { cityById } from "../data/cities";
import { LISTS } from "../data/seed";
import { orderedIds, ratedCount } from "../lib/ranking";

export function ProfileHeader() {
  const { log } = useLog();
  const countries = new Set(orderedIds(log).map((id) => cityById(id)?.country).filter(Boolean));

  return (
    <section className="profile">
      <div className="avatar">JN</div>
      <div>
        <h1>Joseph</h1>
        <span className="handle">@joseph</span>
      </div>
      <div className="pstats">
        <Stat value={ratedCount(log)} label="Cities" />
        <Stat value={log.visits.length} label="Visits" />
        <Stat value={countries.size} label="Countries" />
        <Stat value={log.wishlist.length} label="Departures" />
        <Stat value={LISTS.length} label="Lists" />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="pstat">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}
