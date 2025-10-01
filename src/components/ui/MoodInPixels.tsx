import { getMoodDataFromMood } from '../../utils/moods';
import type { Entry } from '../../global/types';
import Card from '../shared/Card';

interface MoodInPixelsGridProps {
  entries: Entry[];
  setSelectedDate: (date: string) => void;
  selectedDate: string;
}

export default function MoodInPixels({
  entries,
  setSelectedDate,
  selectedDate,
}: MoodInPixelsGridProps) {
  return (
    <Card title='Mood in Pixels'>
      <div className='flex flex-wrap gap-2 mt-2'>
        {entries.map((entry) => (
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
        ))}
      </div>
    </Card>
  );
}
