import { useState, useCallback } from "react";
import { generateGoogleCalendarUrl } from "../utils/calendar";

/**
 * MatchCard — Individual match row with glassmorphism card styling.
 */
export default function MatchCard({ match, isSaved, onToggle }) {
  const [gcalAdded, setGcalAdded] = useState(false);

  const matchDate = new Date(match.date);

  // Format Date: DD.MM.YY
  const day = String(matchDate.getDate()).padStart(2, "0");
  const month = String(matchDate.getMonth() + 1).padStart(2, "0");
  const year = String(matchDate.getFullYear()).slice(-2);
  const formattedDate = `${day}.${month}.${year}`;

  // Format Time: e.g. 10:30 PM (local)
  const formattedTime = matchDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isLive = match.status === "LIVE";

  const handleGcal = useCallback(() => {
    const url = generateGoogleCalendarUrl(match);
    window.open(url, "_blank");
    setGcalAdded(true);
    setTimeout(() => setGcalAdded(false), 1500);
  }, [match]);

  return (
    <div className="match-card" id={`match-${match.id}`}>
      <span className="td-date">{formattedDate}</span>

      <span className="td-match">
        <span className="team">
          {match.homeCrest && (
            <img
              className="team-crest"
              src={match.homeCrest}
              alt=""
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          {match.homeTeam}
        </span>
        <span className="vs">vs</span>
        <span className="team">
          {match.awayCrest && (
            <img
              className="team-crest"
              src={match.awayCrest}
              alt=""
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          {match.awayTeam}
        </span>
      </span>

      <span className="td-time">
        {isLive ? <span className="live-indicator">● LIVE</span> : formattedTime}
      </span>

      <span className="col-add">
        <label className="checkbox-wrap">
          <input
            type="checkbox"
            checked={isSaved}
            onChange={() => onToggle(match)}
          />
          <span className="checkmark" />
        </label>
      </span>

      <span className="col-cal">
        <button
          className={`gcal-btn ${gcalAdded ? "gcal-added" : ""}`}
          title="Add single match to Google Calendar"
          onClick={handleGcal}
        >
          <i className="ri-calendar-schedule-line" />
        </button>
      </span>
    </div>
  );
}
