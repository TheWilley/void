import type { Entry } from '../../global/types';
import Card from '../shared/Card';
import { useSearch } from '../../hooks/useSearch';
import { memo, useEffect } from 'react';
import { compareObjects } from '../../utils/compareObjects';
import Helper from '../shared/Helper';
import { FaSearch } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

interface SearchProps {
  entries: Entry[];
  onSearchResults: (results: Entry[]) => void;
}

function SearchTooltip() {
  return (
    <Helper>
      <div className='overflow-hidden text-wrap'>
        <span className='font-bold text-lg mb-3'>Using Search</span>
        <span className='text-sm'>
          <p>
            Use <code className='text-blue-500'>key=value</code> pairs separated
            by <code className='text-blue-500'>&amp;</code>.
          </p>
          <p>
            E.g:{' '}
            <code className='text-blue-500'>
              date=2023-10-05&amp;mood=Happy&amp;comment=great
            </code>
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
  const { searchText, setSearchText, filteredResults } = useSearch(entries);

  useEffect(() => {
    onSearchResults(filteredResults);
  }, [filteredResults, onSearchResults]);

  return (
    <Card>
      <fieldset className='fieldset'>
        <label className='label'>
          Advanced Search <SearchTooltip />
        </label>

        <label className='input w-full'>
          <FaSearch className='text-gray-400' />
          <input
            type='search'
            className='grow'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='e.g., date=2023-10-05&mood=Happy&comment=great'
          />
          {searchText.length > 0 && (
            <FaX className='cursor-pointer' onClick={() => setSearchText('')} />
          )}
        </label>
      </fieldset>
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
