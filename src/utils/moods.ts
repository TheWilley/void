import { FaMeh, FaSadTear, FaSmile } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import type { Mood } from '../global/types';

type MoodData = {
  value: number;
  type: Mood;
  color: string;
  icon: IconType;
};

// This object is never used directly
const moodsData: MoodData[] = [
  { value: 1, type: 'Sad', color: '#3A74CC', icon: FaSadTear },
  { value: 2, type: 'Neutral', color: '#E6B800', icon: FaMeh },
  { value: 3, type: 'Happy', color: '#57A862', icon: FaSmile },
];

/**
 * Gets the mood data object corresponding to a given mood.
 * @param mood - The mood type to look up.
 * @returns The mood data object or undefined if not found.
 */
export const getMoodDataFromMood = (mood: Mood) => {
  return moodsData.find((m) => m.type === mood);
};

/**
 * Retrieves an array of all mood types.
 * @returns An array of all mood types.
 */
export const getMoodTypes = () => {
  return moodsData.map((m) => m.type);
};
