import MatchCard from "./MatchCard";
import CollectionBar from "./CollectionBar";
import StateMessage from "./StateMessage";

/**
 * MatchList — Renders the match header row + list of MatchCard components.
 * Shows CollectionBar when in collection view, and StateMessage for loading/empty/error.
 */
export default function MatchList({
  matches,
  loading,
  error,
  currentTab,
  selectedLeague,
  isInCollection,
  onToggleMatch,
}) {
  if (loading) {
    return (
      <div className="match-list" id="match-list">
        <StateMessage type="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="match-list" id="match-list">
        <StateMessage type="error" message={error} />
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="match-list" id="match-list">
        <StateMessage
          type={currentTab === "collection" ? "collection" : "empty"}
          message={
            currentTab === "collection"
              ? "Your collection is empty. Check any match to add it here."
              : `No upcoming matches found for ${selectedLeague}`
          }
        />
      </div>
    );
  }

  return (
    <div className="match-list" id="match-list">
      {/* Header Row */}
      <div className="match-header">
        <span>Date</span>
        <span>Match</span>
        <span>Time</span>
        <span className="col-add">Add</span>
        <span className="col-cal">Cal</span>
      </div>

      <div className="match-cards-wrapper" id="match-cards-wrapper">
        {/* Bulk export button for collection */}
        {currentTab === "collection" && <CollectionBar matches={matches} />}

        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            isSaved={isInCollection(match.id)}
            onToggle={onToggleMatch}
          />
        ))}
      </div>
    </div>
  );
}
