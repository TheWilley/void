import { useCallback, useMemo, useState } from 'react';
import type { Entry, Mood } from '../global/types';
import { useLocalStorage } from '@uidotdev/usehooks';

/**
 * Custom hook for managing mood entries.
 * @returns An object containing the state and functions for mood entries.
 */
export default function useMood() {
  const [entries, setEntries] = useLocalStorage<Entry[]>('entries', []);
  const [searchResults, setSearchResults] = useState<Entry[]>([]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const sortedEntries = useMemo(
    () =>
      [...entries]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .reverse(),
    [entries],
  );

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.date === selectedDate),
    [entries, selectedDate],
  );

  const updateEntry = useCallback(
    (mood: Mood | undefined, comment: string | undefined) => {
      const safeMood: Mood = mood ?? 'Neutral';
      const safeComment: string = comment ?? '';

      if (selectedEntry) {
        setEntries(
          entries.map((entry) =>
            entry.date === selectedDate
              ? { ...entry, mood: safeMood, comment: safeComment }
              : entry,
          ),
        );
      } else {
        const newEntry: Entry = {
          mood: safeMood,
          date: selectedDate,
          comment: safeComment,
        };
        setEntries([...entries, newEntry]);
      }
    },
    [entries, selectedDate, selectedEntry, setEntries],
  );

  const deleteEntry = useCallback(() => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setEntries((prev) => prev.filter((entry) => entry.date !== selectedDate));
    }
  }, [selectedDate, setEntries]);

  return {
    selectedEntry,
    sortedEntries,
    selectedDate,
    setEntries,
    setSelectedDate,
    updateEntry,
    deleteEntry,
    searchResults,
    setSearchResults,
  };
}
