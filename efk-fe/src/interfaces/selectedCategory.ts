import { Word } from './word';

export interface SelectedCategory {
  name: null | string;
  words: null | Word[];
  isLoading: boolean;
}
