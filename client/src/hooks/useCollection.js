import { useState, useCallback, useEffect, useMemo } from "react";

const STORAGE_KEY = "sports_calendar_collection";

function readStoredCollection() {
  if (typeof window === "undefined") return {};

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

/**
 * Custom hook for managing the match collection in localStorage.
 */
export function useCollection() {
  const [collection, setCollection] = useState(readStoredCollection);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
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

  const addMatch = useCallback((match) => {
    setCollection((prev) => ({
      ...prev,
      [match.id]: match,
    }));
  }, []);

  const isInCollection = useCallback(
    (matchId) => Boolean(collection[matchId]),
    [collection]
  );

  const count = useMemo(() => Object.keys(collection).length, [collection]);

  const getCollectionMatches = useCallback(() => {
    return Object.values(collection).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [collection]);

  return { collection, toggleMatch, addMatch, isInCollection, count, getCollectionMatches };
}
