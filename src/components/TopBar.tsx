import { NavLink } from "react-router-dom";
import { useTheme } from "../lib/useTheme";

interface TopBarProps {
  onLogVisit: () => void;
}

const LINKS = [
  { to: "/", label: "Activity", end: true },
  { to: "/cities", label: "Cities", end: false },
  { to: "/passport", label: "MyPassport", end: false },
  { to: "/lists", label: "Lists", end: false },
];

export function TopBar({ onLogVisit }: TopBarProps) {
  const { theme, toggle } = useTheme();

  return (
    <>
      <div className="airmail" />
      <header className="topbar">
        <div className="topbar-in">
          <div className="wordmark">
            <b>Arrivals</b>
            <span>Cities, logged</span>
          </div>
          <nav className="nav">
            {LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end}>
                {link.label}
              </NavLink>
            ))}
          </nav>
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
    </>
  );
}
