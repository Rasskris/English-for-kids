import { FetchedFile } from './FetchedFile';

export interface Word {
  id: number;
  name: string;
  translation: string;
  image: FetchedFile;
  audio: FetchedFile;
}
