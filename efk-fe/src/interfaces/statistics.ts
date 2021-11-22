import { Word } from './word';

export interface Statistics extends Word {
  category: string;
  trained: number;
  correct: number;
  incorrect: number;
}
