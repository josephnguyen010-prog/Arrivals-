import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../lib/useTheme";
import { CitySearch } from "./CitySearch";

interface TopBarProps {
  onLogVisit: () => void;
}

/** The app's own bar: wordmark and the things you can do from anywhere. */
export function TopBar({ onLogVisit }: TopBarProps) {
  const { theme, toggle } = useTheme();
  const [searching, setSearching] = useState(false);

  return (
    <>
      <div className="airmail" />
      <header className="topbar">
        <div className="topbar-in">
          <Link className="wordmark" to="/">
            <b>Arrivals</b>
            <span>Cities, logged</span>
          </Link>

          <span className="spacer" />

          <button
            className="theme-btn"
            onClick={() => setSearching(true)}
            aria-label="Search cities"
            title="Search cities"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10.8 10.8 L14.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <button
            className="theme-btn"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

          <button className="log-btn" onClick={onLogVisit}>
            Log a visit
          </button>
        </div>
      </header>

      {searching && <CitySearch onClose={() => setSearching(false)} />}
    </>
  );
}
