import { Word } from './word';
import { FetchedFile } from './FetchedFile';

export interface Category {
  id: number;
  name: string;
  coverImage: FetchedFile;
  icon: FetchedFile;
}

export interface CategoryWithWords extends Category {
  words: Word[];
}
