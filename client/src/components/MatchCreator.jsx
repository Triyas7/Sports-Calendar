import { useState, useMemo, useEffect, useRef } from "react";
import { LEAGUES_LIST, getTeamsForLeague } from "../utils/teamsData";

/**
 * Custom Dropdown with search and team logos
 */
function TeamDropdown({ label, placeholder, teams, selectedTeam, onSelect, disabledTeamId }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const filteredTeams = useMemo(() => {
    if (!search.trim()) return teams;
    return teams.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.shortName.toLowerCase().includes(search.toLowerCase())
    );
  }, [teams, search]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="team-dropdown-container" ref={dropdownRef}>
      {label && <label className="creator-field-label">{label}</label>}
      <button
        type="button"
        className={`team-dropdown-trigger ${selectedTeam ? "has-selection" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {selectedTeam ? (
          <div className="team-trigger-content">
            <img
              src={selectedTeam.logo}
              alt={selectedTeam.name}
              className="team-trigger-logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <span className="team-trigger-name">{selectedTeam.name}</span>
          </div>
        ) : (
          <span className="team-trigger-placeholder">{placeholder || "choose a team"}</span>
        )}
        <i className={`ri-arrow-down-s-line trigger-arrow ${open ? "arrow-rotated" : ""}`} />
      </button>

      {open && (
        <div className="team-dropdown-menu">
          <div className="team-search-box">
            <i className="ri-search-line search-icon" />
            <input
              type="text"
              placeholder="Search team..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="team-search-input"
            />
          </div>

          <div className="team-options-list">
            {filteredTeams.length === 0 ? (
              <div className="team-empty-item">No teams found</div>
            ) : (
              filteredTeams.map((team) => {
                const isDisabled = disabledTeamId === team.id;
                const isSelected = selectedTeam?.id === team.id;
                return (
                  <button
                    key={team.id}
                    type="button"
                    disabled={isDisabled}
                    className={`team-option-item ${isSelected ? "selected" : ""} ${
                      isDisabled ? "disabled" : ""
                    }`}
                    onClick={() => {
                      if (!isDisabled) {
                        onSelect(team);
                        setOpen(false);
                        setSearch("");
                      }
                    }}
                  >
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="team-option-logo"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <span className="team-option-name">{team.name}</span>
                    <span className="team-option-badge">{team.shortName}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * MatchCreator — Faithfully implements the user wireframe:
 * - league dropdown
 * - "choose a team" vs "choose a team" (filtered dynamically by league, with official logos)
 * - date and time inputs
 * - "add to collection" button
 */
export default function MatchCreator({ onAddToCollection, onViewCollection }) {
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES_LIST[0].name);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);

  // Default date to tomorrow, default time to 20:00
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("20:00");

  const [toastMessage, setToastMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [leagueDropdownOpen, setLeagueDropdownOpen] = useState(false);
  const leagueDropdownRef = useRef(null);

  // When league changes, update available teams and reset team selections if needed
  const availableTeams = useMemo(() => {
    return getTeamsForLeague(selectedLeague);
  }, [selectedLeague]);

  // Reset selected teams if they are not in the new league
  const handleLeagueSelect = (leagueName) => {
    setSelectedLeague(leagueName);
    setLeagueDropdownOpen(false);

    const newTeams = getTeamsForLeague(leagueName);
    const newTeamIds = new Set(newTeams.map((t) => t.id));

    if (homeTeam && !newTeamIds.has(homeTeam.id)) setHomeTeam(null);
    if (awayTeam && !newTeamIds.has(awayTeam.id)) setAwayTeam(null);
  };

  // Close league dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (leagueDropdownRef.current && !leagueDropdownRef.current.contains(e.target)) {
        setLeagueDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Add to Collection
  const handleAdd = () => {
    setErrorMsg(null);

    if (!homeTeam) {
      setErrorMsg("Please choose the Home Team");
      return;
    }
    if (!awayTeam) {
      setErrorMsg("Please choose the Away Team");
      return;
    }
    if (homeTeam.id === awayTeam.id) {
      setErrorMsg("Home and Away teams must be different!");
      return;
    }
    if (!date) {
      setErrorMsg("Please choose a match date");
      return;
    }
    if (!time) {
      setErrorMsg("Please specify kickoff time");
      return;
    }

    // Build ISO match datetime
    const matchDateTime = new Date(`${date}T${time}:00`);

    const newMatch = {
      id: `custom_${Date.now()}_${homeTeam.id}_${awayTeam.id}`,
      league: selectedLeague,
      date: matchDateTime.toISOString(),
      timeFormatted: time,
      homeTeam: homeTeam.name,
      awayTeam: awayTeam.name,
      status: "SCHEDULED",
      statusText: "Scheduled",
      homeScore: null,
      awayScore: null,
      scoreStr: null,
      homeCrest: homeTeam.logo,
      awayCrest: awayTeam.logo,
    };

    onAddToCollection(newMatch);

    setToastMessage(`Added ${homeTeam.name} vs ${awayTeam.name} to your collection!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const currentLeagueObj =
    LEAGUES_LIST.find((l) => l.name === selectedLeague) || LEAGUES_LIST[0];

  return (
    <div className="match-creator-wrapper">
      {/* Toast notification */}
      {toastMessage && (
        <div className="creator-toast">
          <i className="ri-checkbox-circle-fill toast-icon" />
          <span>{toastMessage}</span>
          {onViewCollection && (
            <button className="toast-action-btn" onClick={onViewCollection}>
              View Collection →
            </button>
          )}
        </div>
      )}

      <div className="creator-card">
        {/* Card Header / Diagram Subtitle */}
        <div className="creator-card-header">
          <div className="creator-badge">
            <i className="ri-edit-circle-line" />
            <span>Match Creator</span>
          </div>
          <h2 className="creator-heading">Schedule a Fixture</h2>
          <p className="creator-subheading">
            Select a league to load official teams, pick your matchup, set kickoff time, and save
            it to your calendar collection.
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="creator-error-banner">
            <i className="ri-error-warning-line" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="creator-form">
          {/* 1. League Dropdown */}
          <div className="creator-form-row">
            <div className="league-dropdown-container" ref={leagueDropdownRef}>
              <label className="creator-field-label">
                <span className="field-wireframe-label">league</span>
              </label>

              <button
                type="button"
                className="league-dropdown-trigger"
                onClick={() => setLeagueDropdownOpen((prev) => !prev)}
              >
                <div className="league-trigger-left">
                  <img
                    src={currentLeagueObj.icon}
                    alt={currentLeagueObj.name}
                    className="league-trigger-logo"
                    onError={(e) => {
                      e.target.src = "/logos/all-leagues.svg";
                    }}
                  />
                  <span className="league-trigger-title">{currentLeagueObj.name}</span>
                </div>
                <i
                  className={`ri-arrow-down-s-line trigger-arrow ${
                    leagueDropdownOpen ? "arrow-rotated" : ""
                  }`}
                />
              </button>

              {leagueDropdownOpen && (
                <div className="league-dropdown-menu">
                  {LEAGUES_LIST.map((league) => (
                    <button
                      key={league.code}
                      type="button"
                      className={`league-option-item ${
                        selectedLeague === league.name ? "selected" : ""
                      }`}
                      onClick={() => handleLeagueSelect(league.name)}
                    >
                      <img
                        src={league.icon}
                        alt={league.name}
                        className="league-option-logo"
                        onError={(e) => {
                          e.target.src = "/logos/all-leagues.svg";
                        }}
                      />
                      <span>{league.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Wireframe Connector Arrows Label */}
          <div className="wireframe-flow-indicator">
            <i className="ri-arrow-down-line flow-arrow" />
            <span className="flow-text">teams filtered for {selectedLeague}</span>
            <i className="ri-arrow-down-line flow-arrow" />
          </div>

          {/* 2. Choose a Team VS Choose a Team */}
          <div className="creator-teams-row">
            <div className="creator-team-col">
              <TeamDropdown
                label="Home Team"
                placeholder="choose a team"
                teams={availableTeams}
                selectedTeam={homeTeam}
                onSelect={setHomeTeam}
                disabledTeamId={awayTeam?.id}
              />
            </div>

            <div className="creator-vs-badge">
              <span>VS</span>
            </div>

            <div className="creator-team-col">
              <TeamDropdown
                label="Away Team"
                placeholder="choose a team"
                teams={availableTeams}
                selectedTeam={awayTeam}
                onSelect={setAwayTeam}
                disabledTeamId={homeTeam?.id}
              />
            </div>
          </div>

          {/* 3. Date & Time Row */}
          <div className="creator-datetime-row">
            <div className="creator-dt-col">
              <label className="creator-field-label">
                <span className="field-wireframe-label">date:</span>
              </label>
              <div className="creator-input-wrapper">
                <i className="ri-calendar-line input-icon" />
                <input
                  type="date"
                  className="creator-dt-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="creator-dt-col">
              <label className="creator-field-label">
                <span className="field-wireframe-label">time:</span>
              </label>
              <div className="creator-input-wrapper">
                <i className="ri-time-line input-icon" />
                <input
                  type="time"
                  className="creator-dt-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          {(homeTeam || awayTeam) && (
            <div className="creator-preview-box">
              <span className="preview-label">Live Match Preview</span>
              <div className="preview-card">
                <div className="preview-league-badge">
                  <img
                    src={currentLeagueObj.icon}
                    alt={selectedLeague}
                    className="preview-league-logo"
                  />
                  <span>{selectedLeague}</span>
                </div>

                <div className="preview-teams-layout">
                  <div className="preview-team">
                    {homeTeam ? (
                      <>
                        <img
                          src={homeTeam.logo}
                          alt={homeTeam.name}
                          className="preview-team-crest"
                        />
                        <span className="preview-team-name">{homeTeam.name}</span>
                      </>
                    ) : (
                      <span className="preview-team-empty">Home Team</span>
                    )}
                  </div>

                  <div className="preview-center">
                    <span className="preview-vs-tag">VS</span>
                    <span className="preview-time-tag">
                      {date ? new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : ""} {time}
                    </span>
                  </div>

                  <div className="preview-team">
                    {awayTeam ? (
                      <>
                        <img
                          src={awayTeam.logo}
                          alt={awayTeam.name}
                          className="preview-team-crest"
                        />
                        <span className="preview-team-name">{awayTeam.name}</span>
                      </>
                    ) : (
                      <span className="preview-team-empty">Away Team</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Add to Collection Button */}
          <button
            type="button"
            className="creator-submit-btn"
            id="btn-add-to-collection"
            onClick={handleAdd}
          >
            <i className="ri-add-circle-fill btn-icon" />
            <span>add to collection</span>
          </button>
        </div>
      </div>
    </div>
  );
}
