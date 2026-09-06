import { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import MatchList from "./components/MatchList";
import MatchCreator from "./components/MatchCreator";
import { useCollection } from "./hooks/useCollection";
import "./App.css";

/**
 * App — Root layout: Sidebar + Main content area (MatchCreator & Your Collection).
 * Focused on the interactive Match Creator wireframe and personal calendar collection.
 * (Live API fixtures are preserved on the 'backup/sports-calendar-v1' and 'live-fixtures' branches).
 */
export default function App() {
  const [currentTab, setCurrentTab] = useState("creator");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { toggleMatch, addMatch, isInCollection, count, getCollectionMatches } = useCollection();

  const handleTabChange = useCallback((tab) => {
    setCurrentTab(tab);
  }, []);

  const collectionMatches = getCollectionMatches();

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
        {/* Match Creator — Primary wireframe feature */}
        {currentTab === "creator" && (
          <MatchCreator
            onAddToCollection={addMatch}
            onViewCollection={() => setCurrentTab("collection")}
          />
        )}

        {/* Collection view */}
        {currentTab === "collection" && (
          <>
            <div className="collection-header">
              <h2 className="collection-title">
                <i className="ri-bookmark-fill" />
                Your Collection
              </h2>
              <span className="collection-subtitle">
                {count} {count === 1 ? "match" : "matches"} scheduled
              </span>
            </div>

            <MatchList
              matches={collectionMatches}
              loading={false}
              error={null}
              currentTab="collection"
              selectedLeague="All Leagues"
              isInCollection={isInCollection}
              onToggleMatch={toggleMatch}
            />
          </>
        )}
      </section>
    </main>
  );
}
