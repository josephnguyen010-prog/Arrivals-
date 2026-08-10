import { useState } from "react";
import { cityById } from "../data/cities";
import { LISTS } from "../data/seed";
import { orderedIds, ratedCount } from "../lib/ranking";
import { useLog } from "../state/LogContext";
import { useProfile } from "../state/ProfileContext";
import { EditProfile } from "./EditProfile";

export function ProfileHeader() {
  const { log } = useLog();
  const { profile, initials } = useProfile();
  const [editing, setEditing] = useState(false);

  const countries = new Set(orderedIds(log).map((id) => cityById(id)?.country).filter(Boolean));

  return (
    <section className="profile">
      {profile.avatar ? (
        <img className="avatar-preview" src={profile.avatar} alt="" />
      ) : (
        <div className="avatar">{initials}</div>
      )}

      <div className="who-block">
        <h1>{profile.name}</h1>
        <span className="handle">@{profile.handle}</span>
        {profile.bio && <p className="bio">{profile.bio}</p>}
        <button className="ghost edit-profile" onClick={() => setEditing(true)}>
          Edit profile
        </button>
      </div>

      <div className="pstats">
        <Stat value={ratedCount(log)} label="Cities" />
        <Stat value={log.visits.length} label="Visits" />
        <Stat value={countries.size} label="Countries" />
        <Stat value={log.wishlist.length} label="Departures" />
        <Stat value={LISTS.length} label="Lists" />
      </div>

      {editing && <EditProfile onClose={() => setEditing(false)} />}
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
