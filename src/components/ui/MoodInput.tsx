import { getMoodDataFromMood, getMoodTypes } from '../../utils/moods';
import type { Entry, Mood } from '../../global/types';
import Card from '../shared/Card';
import { FaTrash } from 'react-icons/fa';

interface MoodInputProps {
  selectedEntry: Entry | undefined;
  updateEntry: (mood: Mood | undefined, comment: string | undefined) => void;
  deleteEntry: () => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

function MoodInput({
  selectedEntry,
  updateEntry,
  deleteEntry,
  selectedDate,
  setSelectedDate,
}: MoodInputProps) {
  return (
    <Card title='Mood Input'>
      <textarea
        value={selectedEntry?.comment || ''}
        onChange={(e) => {
          updateEntry(selectedEntry?.mood, e.target.value);
        }}
        placeholder='How are you feeling today?'
        className='textarea textarea-bordered w-full'
      />
      <input
        type='date'
        className='mt-2 input input-bordered w-full'
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <div className='grid grid-cols-3 gap-4 mt-4'>
        {getMoodTypes().map((mood) => {
          const moodData = getMoodDataFromMood(mood);
          const Icon = moodData?.icon;

          return (
            <button
              type='button'
              key={mood}
              onClick={() => {
                updateEntry(mood, selectedEntry?.comment);
              }}
              className={`btn text-white ${
                mood === selectedEntry?.mood && 'border-3 border-white'
              }`}
              style={{ backgroundColor: moodData?.color }}
            >
              {Icon && <Icon className='inline-block text-center' />}
              <span className='ml-2 sm:inline-block hidden'>{mood}</span>
            </button>
          );
        })}

        <button
          type='button'
          onClick={deleteEntry}
          disabled={!selectedEntry}
          className='btn bg-red-600 col-start-2 text-white'
        >
          <FaTrash /> <span className='sm:inline-block hidden'>Delete</span>
        </button>
      </div>
    </Card>
  );
}

export default MoodInput;
