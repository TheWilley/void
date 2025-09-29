import qs from 'qs';
import { useState, useMemo } from 'react';
import type { Entry } from '../global/types';

interface ParsedCriteria {
  date?: string;
  mood?: string;
  dateRange?: { start: string; end: string };
  comment?: string;
}

/**
 * Parses a search string into criteria for advanced search using `qs`.
 * @param searchString - The input search string with syntax.
 * @returns Parsed search criteria.
 */
export function parseSearchString(searchString: string): ParsedCriteria {
  const parsed = qs.parse(searchString, { ignoreQueryPrefix: true });

  const criteria: ParsedCriteria = {
    date: parsed.date as string,
    mood: parsed.mood as string,
    dateRange: parsed.range
      ? {
          start: (parsed.range as string).split(',')[0],
          end: (parsed.range as string).split(',')[1],
        }
      : undefined,
    comment: parsed.comment as string,
  };

  return criteria;
}

/**
 * Filters entries based on advanced search criteria.
 * @param entries - The list of entries to search through.
 * @param criteria - The search criteria.
 * @returns Filtered entries matching the criteria.
 */
export function advancedSearch(
  entries: Entry[],
  criteria: ParsedCriteria,
): Entry[] {
  return entries.filter((entry) => {
    const matchesDate = criteria.date ? entry.date === criteria.date : true;
    const matchesMood = criteria.mood ? entry.mood === criteria.mood : true;
    const matchesDateRange = criteria.dateRange
      ? new Date(entry.date) >= new Date(criteria.dateRange.start) &&
        new Date(entry.date) <= new Date(criteria.dateRange.end)
      : true;
    const matchesComment = criteria.comment
      ? entry.comment.toLowerCase().includes(criteria.comment.toLowerCase())
      : true;

    return matchesDate && matchesMood && matchesDateRange && matchesComment;
  });
}

/**
 * Custom hook for search functionality.
 * @param entries - The list of entries to search through.
 * @returns An object containing the search text, a setter for the search text, and the filtered results.
 */
export function useSearch(entries: Entry[]) {
  const [searchText, setSearchText] = useState('');

  const filteredResults = useMemo(() => {
    const criteria = parseSearchString(searchText);
    return advancedSearch(entries, criteria);
  }, [entries, searchText]);

  return {
    searchText,
    setSearchText,
    filteredResults,
  };
}
