import { Word } from './word';
import { FetchedFile } from './fetchedFile';

export interface Category {
  id: number;
  name: string;
  coverImage: FetchedFile;
  icon: FetchedFile;
}

export interface CategoryDataToSubmit {
  [index: string]: string | File;
  name: string;
  coverImage: File;
  icon: File;
}

export interface CategoryWithWords extends Category {
  words: Word[];
}

export interface CategoryFiles {
  coverImage: null | File;
  icon: null | File;
}

export interface CategoryInputs extends CategoryFiles {
  name: string;
}
