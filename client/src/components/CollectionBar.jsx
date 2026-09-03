import { useState, useCallback } from "react";
import { downloadICS } from "../utils/calendar";

/**
 * CollectionBar — Bulk export button for collection view (download .ics).
 */
export default function CollectionBar({ matches }) {
  const [exported, setExported] = useState(false);

  const handleExport = useCallback(() => {
    downloadICS(matches);
    setExported(true);
    setTimeout(() => setExported(false), 3500);
  }, [matches]);

  if (!matches || matches.length === 0) return null;

  return (
    <div className="collection-action-bar">
      <button
        className={`add-all-gcal-btn ${exported ? "gcal-exported" : ""}`}
        id="add-all-gcal-btn"
        onClick={handleExport}
      >
        {exported ? (
          <>
            <i className="ri-check-line" />
            <span>Downloaded .ics file! Import it directly into Google Calendar</span>
          </>
        ) : (
          <>
            <svg
              className="google-cal-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
            >
              <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M9.5 13.5l2 2 3.5-4" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Export All ({matches.length}) Matches to Google Calendar (.ics)</span>
          </>
        )}
      </button>
    </div>
  );
}
