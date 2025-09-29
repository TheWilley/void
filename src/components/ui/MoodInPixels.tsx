import type { Entry } from '../../global/types';
import Card from '../shared/Card';
import MoodInPixelsGrid from './MoodInPixelsGrid';

interface ColorGridProps {
  entries: Entry[];
  setSelectedDate: (date: string) => void;
  selectedDate: string;
}

function MoodInPixels({
  entries,
  setSelectedDate,
  selectedDate,
}: ColorGridProps) {
  if (!entries.length) return null;

  return (
    <Card title='Mood In Pixels'>
      <MoodInPixelsGrid
        entries={entries}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
    </Card>
  );
}

export default MoodInPixels;
