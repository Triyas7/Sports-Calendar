/**
 * StateMessage — Displays loading spinner, empty state, or error messages.
 */
export default function StateMessage({ type = "empty", message = "", children }) {
  if (type === "loading") {
    return (
      <div className="state-container">
        <div className="spinner" />
        <div>{message || "Fetching upcoming live fixtures..."}</div>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="state-container">
        <i className="ri-error-warning-line" style={{ color: "#ff6b6b" }} />
        <div><strong>Unable to load matches</strong></div>
        <div className="state-sub">{message || "Please check your connection."}</div>
      </div>
    );
  }

  // Empty / default
  return (
    <div className="state-container">
      <i className={type === "collection" ? "ri-bookmark-line" : "ri-calendar-line"} />
      <div>{message || "No matches found."}</div>
      {children}
    </div>
  );
}
