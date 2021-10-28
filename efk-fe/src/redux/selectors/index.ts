import { AppState } from '../store';
import { categoriesAdapter, wordsAdapter } from '../entityAdapters';

export const { selectAll: selectCategories } = categoriesAdapter.getSelectors<AppState>(
  (state) => state.categories,
);

export const { selectAll: selectWords } = wordsAdapter.getSelectors<AppState>((state) => state.words);
