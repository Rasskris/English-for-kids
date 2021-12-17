import { CategoryWithWords } from '../interfaces';
import { mockedCategory } from './mockedCategory';
import { mockedWord } from './mockedWord';

export const mockedCategoryWithWords: CategoryWithWords = {
  ...mockedCategory,
  words: [mockedWord, { ...mockedWord, id: 2 }],
};
