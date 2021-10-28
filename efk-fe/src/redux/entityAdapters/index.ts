import { createEntityAdapter } from '@reduxjs/toolkit';
import { Category, Word } from '../../interfaces';

export const categoriesAdapter = createEntityAdapter<Category>({
  selectId: (category) => category.id,
});

export const wordsAdapter = createEntityAdapter<Word>({
  selectId: (word) => word.id,
});
