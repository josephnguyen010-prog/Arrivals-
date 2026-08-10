import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LogVisitFlow } from "./components/LogVisitFlow";
import { ProfileHeader } from "./components/ProfileHeader";
import { TopBar } from "./components/TopBar";
import { Activity } from "./screens/Activity";
import { Cities } from "./screens/Cities";
import { CityPage } from "./screens/CityPage";
import { Departures } from "./screens/Departures";
import { ListPage } from "./screens/ListPage";
import { Lists } from "./screens/Lists";
import { Passport } from "./screens/Passport";

export function App() {
  const [logging, setLogging] = useState(false);

  return (
    <>
      <TopBar onLogVisit={() => setLogging(true)} />

      <div className="wrap">
        <ProfileHeader />

        <Routes>
          <Route path="/" element={<Activity />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/departures" element={<Departures />} />
          <Route path="/passport" element={<Passport />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/list/:id" element={<ListPage />} />
          <Route path="/city/:id" element={<CityPage />} />
        </Routes>

        <p className="note">
          <b>Prototype.</b> Ratings are yours to set, but the ordering is real: when you give a city
          the same star rating as one you've already logged, it runs a binary-search insertion to work
          out which of the two you actually preferred. That is why it only ever asks a question or two.
          Your log is saved in this browser.
        </p>
        <p className="note">
          Photographs from Wikimedia Commons, all CC0 or attribution-only, credited on each city's
          page and in CREDITS.md. Friends and their notes are invented. <b>Arrivals</b> is a working
          title.
        </p>
      </div>

      {logging && <LogVisitFlow onClose={() => setLogging(false)} />}
    </>
  );
}
