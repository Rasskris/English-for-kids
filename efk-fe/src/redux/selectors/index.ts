import { RootState } from '../store';
import { categoriesAdapter, wordsAdapter } from '../entityAdapters';
import { GAME_MODE } from '../../constants';

export const { selectAll: selectCategories } = categoriesAdapter.getSelectors<RootState>(
  (state) => state.categories,
);

export const { selectAll: selectWords } = wordsAdapter.getSelectors<RootState>((state) => state.words);

export const selectGameMode = (state: RootState): GAME_MODE => state.game.mode;

export const selectGameStatus = (state: RootState): boolean => state.game.isStarted;
