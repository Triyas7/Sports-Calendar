import { useState, useRef, useEffect } from "react";
import { LEAGUE_CONFIG, LEAGUE_NAMES } from "../utils/constants";

/**
 * FilterBar — League selector dropdown with glassmorphism styling.
 */
export default function FilterBar({ selectedLeague, onLeagueChange, matchFilter = "all", onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const currentLeague = LEAGUE_CONFIG[selectedLeague];

  return (
    <div className="filter-bar" id="filter-bar">
      <div className="filter-left">
        <label className="filter-label">League:</label>
        <div className="custom-dropdown" ref={dropdownRef}>
          <button
            className="dropdown-trigger"
            id="dropdown-trigger"
            aria-expanded={isOpen}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          >
            <span className="dropdown-selected-inner">
              <img
                className="league-logo"
                src={currentLeague?.icon}
                alt={selectedLeague}
                onError={(e) => (e.target.style.display = "none")}
              />
              {selectedLeague}
            </span>
            <svg
              className="dropdown-chevron"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
            {LEAGUE_NAMES.map((name) => (
              <div
                key={name}
                className={`dropdown-item ${name === selectedLeague ? "active" : ""}`}
                onClick={() => {
                  onLeagueChange(name);
                  setIsOpen(false);
                }}
              >
                <img
                  className="league-logo"
                  src={LEAGUE_CONFIG[name].icon}
                  alt={name}
                  onError={(e) => (e.target.style.display = "none")}
                />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Match Filter: All, Future 20, Recent */}
      {onFilterChange && (
        <div className="match-filter-tabs">
          <button
            className={`match-filter-btn ${matchFilter === "all" ? "active" : ""}`}
            onClick={() => onFilterChange("all")}
          >
            All
          </button>
          <button
            className={`match-filter-btn ${matchFilter === "upcoming" ? "active" : ""}`}
            onClick={() => onFilterChange("upcoming")}
          >
            📅 Future 20
          </button>
          <button
            className={`match-filter-btn ${matchFilter === "recent" ? "active" : ""}`}
            onClick={() => onFilterChange("recent")}
          >
            ⚡ Recent Results
          </button>
        </div>
      )}
    </div>
  );
}
