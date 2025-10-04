import type { Entry } from '../../global/types';
import Card from '../shared/Card';
import { useSearch } from '../../hooks/useSearch';
import { memo, useEffect } from 'react';
import { compareObjects } from '../../utils/compareObjects';
import Helper from '../shared/Helper';
import { FaSearch } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import ContentEditable from 'react-contenteditable';

interface SearchProps {
  entries: Entry[];
  onSearchResults: (results: Entry[]) => void;
}

const suggestions = [
  { group: 'Moods', items: ['mood=Happy', 'mood=Neutral', 'mood=Sad'] },
  {
    group: 'Dates',
    items: [
      `date=${new Date().toISOString().split('T')[0]}`,
      `date=${new Date(Date.now() + 86400000).toISOString().split('T')[0]}`,
      `date=${new Date(Date.now() - 86400000).toISOString().split('T')[0]}`,
    ],
  },
  { group: 'Fields', items: ['date=', 'mood=', 'comment=', 'range='] },
];

function SearchTooltip() {
  return (
    <Helper>
      <div className='overflow-hidden text-wrap'>
        <span className='font-bold text-lg mb-3'>Using Search</span>
        <span className='text-sm'>
          <p>
            Use <code>key=value</code> pairs separated by <code>&amp;</code>.
          </p>
          <p>
            E.g: <code>date=2023-10-05&amp;mood=Happy&amp;comment=great</code>
          </p>
        </span>
        <table className='table text-xs'>
          <thead>
            <tr>
              <th className='text-left pr-4'>Field</th>
              <th className='text-left'>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='pr-4'>date</td>
              <td>YYYY-MM-DD (e.g., 2023-10-05)</td>
            </tr>
            <tr>
              <td className='pr-4'>mood</td>
              <td>Happy, Neutral, Sad</td>
            </tr>
            <tr>
              <td className='pr-4'>comment</td>
              <td>Text search (e.g., great)</td>
            </tr>
            <tr>
              <td className='pr-4'>range</td>
              <td>
                Start and end date, comma-separated (e.g.,
                2023-10-01,2023-10-05)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Helper>
  );
}

function Search({ entries, onSearchResults }: SearchProps) {
  const {
    searchText,
    setSearchText,
    filteredResults,
    searchRef,
    onChange,
    highlightedText,
  } = useSearch(entries);

  useEffect(() => {
    onSearchResults(filteredResults);
  }, [filteredResults, onSearchResults]);

  return (
    <Card>
      <fieldset className='fieldset'>
        <label className='label'>
          Advanced Search <SearchTooltip />
        </label>

        <label
          className='input w-full'
          onClick={() => searchRef.current.focus()}
        >
          <FaSearch className='text-gray-400' />
          <ContentEditable
            innerRef={searchRef}
            onChange={onChange}
            html={highlightedText}
            className='grow outline-none whitespace-pre-wrap break-words'
          />
          {searchText.length > 0 && (
            <FaX className='cursor-pointer' onClick={() => setSearchText('')} />
          )}
        </label>
      </fieldset>
      <div
        tabIndex={0}
        className='collapse collapse-arrow bg-base-100 border-base-300 border'
      >
        <input type='checkbox' className='peer' />
        <div className='collapse-title font-semibold'>Suggestions</div>
        <div className='collapse-content text-sm'>
          {suggestions.map((section) => (
            <div key={section.group} className='mb-2 last:mb-0'>
              <h4 className='font-semibold'>{section.group}</h4>
              <div className='flex flex-wrap gap-2 mt-1'>
                {section.items.map((item) => (
                  <button
                    type='button'
                    key={item}
                    className='btn'
                    onClick={() => {
                      setSearchText(item);
                      searchRef.current.focus();
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {filteredResults.length !== entries.length && (
          <p className='text-sm text-gray-500 mt-1'>
            Showing {filteredResults.length} of {entries.length} entries
          </p>
        )}
      </div>
    </Card>
  );
}

export default memo(Search, (prevProps, nextProps) => {
  return compareObjects(prevProps.entries, nextProps.entries);
});
