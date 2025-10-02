import qs from 'qs';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import type { Entry } from '../global/types';
import sanitizeHtml from 'sanitize-html';

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
    const matchesMood = criteria.mood
      ? entry.mood.toLowerCase() === criteria.mood.toLowerCase()
      : true;
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
 * Highlights key=value pairs in the search text.
 * @param text - The input text to highlight.
 * @returns The highlighted HTML string.
 */
export function highlightKeyValuePairs(text: string): string {
  // Regular expression to match key=value pairs
  const regex = /(\w+)=([\w\s]+)/g;

  // Replace matches with highlighted HTML
  return text.replace(regex, (_, key, value) => {
    return `<span class="highlight-key">${key}</span>=<span class="highlight-value">${value}</span>`;
  });
}

/**
 * Custom hook for search functionality.
 * @param entries - The list of entries to search through.
 * @returns An object containing the search text, a setter for the search text, and the filtered results.
 */
export function useSearch(entries: Entry[]) {
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<HTMLElement>(null!);

  const filteredResults = useMemo(() => {
    const criteria = parseSearchString(searchText);
    return advancedSearch(entries, criteria);
  }, [entries, searchText]);

  const highlightedText = useMemo(() => {
    return highlightKeyValuePairs(sanitizeHtml(searchText));
  }, [searchText]);

  const onChange = useCallback((e: React.FormEvent<HTMLElement>) => {
    setSearchText(e.currentTarget.textContent || '');
  }, []);

  useEffect(() => {
    searchRef.current.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  }, []);

  return {
    onChange,
    searchRef,
    searchText,
    setSearchText,
    filteredResults,
    highlightedText,
  };
}
