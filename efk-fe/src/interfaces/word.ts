import { FetchedFile } from './fetchedFile';

export interface Word {
  id: number;
  name: string;
  translation: string;
  image: FetchedFile;
  audio: FetchedFile;
}

export interface WordDataToSubmit {
  [index: string]: string | File;
  name: string;
  translation: string;
  image: File;
  audio: File;
}

export interface WordFiles {
  image: null | File;
  audio: null | File;
}

export interface WordInputs extends WordFiles {
  name: string;
  translation: string;
}
