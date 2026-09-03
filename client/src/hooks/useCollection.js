import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "sports_calendar_collection";

/**
 * Custom hook for managing the match collection in localStorage.
 * Returns { collection, toggleMatch, isInCollection, count, getCollectionMatches }
 */
export function useCollection() {
  const [collection, setCollection] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });

  // Persist to localStorage whenever collection changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  }, [collection]);

  const toggleMatch = useCallback((match) => {
    setCollection((prev) => {
      const next = { ...prev };
      if (next[match.id]) {
        delete next[match.id];
      } else {
        next[match.id] = match;
      }
      return next;
    });
  }, []);

  const isInCollection = useCallback(
    (matchId) => !!collection[matchId],
    [collection]
  );

  const count = Object.keys(collection).length;

  const getCollectionMatches = useCallback(() => {
    return Object.values(collection).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [collection]);

  return { collection, toggleMatch, isInCollection, count, getCollectionMatches };
}
