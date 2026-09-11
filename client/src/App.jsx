import { useState, useCallback, useMemo } from "react";
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "./components/Sidebar";
import MatchList from "./components/MatchList";
import MatchCreator from "./components/MatchCreator";
import { useCollection } from "./hooks/useCollection";
import "./App.css";

export default function App() {
  const [currentTab, setCurrentTab] = useState("creator");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { toggleMatch, addMatch, isInCollection, count, getCollectionMatches } = useCollection();

  const handleTabChange = useCallback((tab) => {
    setCurrentTab(tab);
  }, []);

  const collectionMatches = useMemo(() => getCollectionMatches(), [getCollectionMatches]);

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
      <Analytics />
    </main>
  );
}
