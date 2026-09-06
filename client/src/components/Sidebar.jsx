/**
 * Sidebar — Brand header, sport nav tabs, and collection badge.
 * On mobile, renders as a slide-in overlay toggled by a hamburger button.
 */
export default function Sidebar({ currentTab, onTabChange, collectionCount, isMobileOpen, onMobileClose }) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && <div className="sidebar-backdrop" onClick={onMobileClose} />}

      <aside className={`options-container ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="brand-header">
          <i className="ri-football-line brand-icon" />
          <span className="brand-title">Sports Calendar</span>
          {/* Mobile close button */}
          <button className="sidebar-close-btn" onClick={onMobileClose} aria-label="Close menu">
            <i className="ri-close-line" />
          </button>
        </div>

        <h2 className="options-title">Options</h2>

        <button
          className={`nav-btn ${currentTab === "creator" ? "active" : ""}`}
          id="btn-creator"
          onClick={() => {
            onTabChange("creator");
            onMobileClose();
          }}
        >
          <i className="ri-add-circle-line" />
          Match Creator
        </button>

        <button
          className={`nav-btn ${currentTab === "collection" ? "active" : ""}`}
          id="btn-collection"
          onClick={() => {
            onTabChange("collection");
            onMobileClose();
          }}
        >
          <i className="ri-bookmark-line" />
          Your Collection
          <span className="badge-count" id="collection-count">
            {collectionCount}
          </span>
        </button>
      </aside>
    </>
  );
}
