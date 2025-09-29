export type Mood = 'Happy' | 'Neutral' | 'Sad';

export interface Entry {
  mood: Mood;
  date: string;
  comment: string;
}
