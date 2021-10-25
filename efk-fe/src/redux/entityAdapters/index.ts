import { createEntityAdapter } from '@reduxjs/toolkit';
import { Category, Word } from '../../interfaces';

export const categoryAdapter = createEntityAdapter<Category>({
  selectId: (category) => category.id,
});

export const wordAdapter = createEntityAdapter<Word>({
  selectId: (word) => word.id,
});
