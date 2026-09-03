import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import FilterBar from "./components/FilterBar";
import MatchList from "./components/MatchList";
import { useCollection } from "./hooks/useCollection";
import { LEAGUE_CONFIG } from "./utils/constants";
import { API_BASE_URL } from "./utils/constants";
import "./App.css";

/**
 * App — Root layout: Sidebar + Main content area (FilterBar + MatchList).
 * Manages global state for tab switching, league selection, and data fetching.
 */
export default function App() {
  const [currentTab, setCurrentTab] = useState("football");
  const [selectedLeague, setSelectedLeague] = useState("All Leagues");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { toggleMatch, isInCollection, count, getCollectionMatches } = useCollection();

  // ── Fetch matches from Express proxy ──
  const fetchMatches = useCallback(async (leagueName) => {
    const leagueInfo = LEAGUE_CONFIG[leagueName];
    const leagueCode = leagueInfo ? leagueInfo.code : "ALL";

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/matches?league=${leagueCode}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${res.status}`);
      }
      const data = await res.json();
      setMatches(data.data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
      setError(err.message || "Failed to fetch matches. Is the server running?");
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch on league change (football tab) ──
  useEffect(() => {
    if (currentTab === "football") {
      fetchMatches(selectedLeague);
    }
  }, [currentTab, selectedLeague, fetchMatches]);

  // ── Determine which matches to display ──
  const displayMatches =
    currentTab === "collection"
      ? getCollectionMatches()
      : selectedLeague === "All Leagues"
        ? matches
        : matches.filter((m) => m.league === selectedLeague);

  // ── League change handler ──
  const handleLeagueChange = useCallback((leagueName) => {
    setSelectedLeague(leagueName);
  }, []);

  // ── Tab change handler ──
  const handleTabChange = useCallback((tab) => {
    setCurrentTab(tab);
    if (tab === "football") {
      setError(null);
    }
  }, []);

  return (
    <main className="app-wrapper">
      {/* Mobile hamburger toggle */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <i className="ri-menu-line" />
      </button>

      <Sidebar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        collectionCount={count}
        isMobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <section className="main-container">
        {/* Filter Bar — only visible in football tab */}
        {currentTab === "football" && (
          <>
            <FilterBar
              selectedLeague={selectedLeague}
              onLeagueChange={handleLeagueChange}
            />
            <hr className="main-divider" />
          </>
        )}

        {/* Collection header */}
        {currentTab === "collection" && (
          <div className="collection-header">
            <h2 className="collection-title">
              <i className="ri-bookmark-fill" />
              Your Collection
            </h2>
            <span className="collection-subtitle">
              {count} {count === 1 ? "match" : "matches"} saved
            </span>
          </div>
        )}

        <MatchList
          matches={displayMatches}
          loading={currentTab === "football" && loading}
          error={currentTab === "football" ? error : null}
          currentTab={currentTab}
          selectedLeague={selectedLeague}
          isInCollection={isInCollection}
          onToggleMatch={toggleMatch}
        />
      </section>
    </main>
  );
}
