import { getMoodDataFromMood } from '../../utils/moods';
import type { Entry } from '../../global/types';
import Card from '../shared/Card';
import { usePagination } from '../../hooks/usePagination';

interface MoodInPixelsGridProps {
  entries: Entry[];
  setSelectedDate: (date: string) => void;
  selectedDate: string;
}

const entriesPerPage = 100;

export default function MoodInPixels({
  entries,
  setSelectedDate,
  selectedDate,
}: MoodInPixelsGridProps) {
  const {
    currentPage,
    totalPages,
    paginatedEntries,
    handlePreviousPage,
    handleNextPage,
  } = usePagination(entries, entriesPerPage);

  return (
    <Card title='Mood in Pixels'>
      <div className='flex flex-wrap gap-2 mt-2'>
        {(entries.length > entriesPerPage ? paginatedEntries : entries).map(
          (entry) => (
            <div className='tooltip' data-tip={entry.date} key={entry.date}>
              <div
                className={`w-6 h-6 rounded-sm cursor-pointer hover:scale-130 transition-transform dark:border-white border-black ${
                  entry.date === selectedDate ? 'border-3 border-primary' : ''
                }`}
                style={{
                  backgroundColor: getMoodDataFromMood(entry.mood)?.color,
                }}
                onClick={() => setSelectedDate(entry.date)}
              ></div>
            </div>
          ),
        )}
      </div>

      {entries.length > entriesPerPage && (
        <div className='flex justify-center items-center gap-4 mt-4'>
          <button
            type='button'
            className='btn btn-sm bg-base-300'
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type='button'
            className='btn btn-sm bg-base-300'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </Card>
  );
}
