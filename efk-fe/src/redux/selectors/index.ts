import { RootState } from '../store';
import { categoriesAdapter, wordsAdapter } from '../entityAdapters';
import { ANSWER, GAME_MODE, GAME_STATUS } from '../../constants';

export const { selectAll: selectCategories } = categoriesAdapter.getSelectors<RootState>(
  (state) => state.categories,
);

export const { selectAll: selectWords } = wordsAdapter.getSelectors<RootState>((state) => state.words);

export const selectGameMode = (state: RootState): GAME_MODE => state.game.mode;

export const selectGameStatus = (state: RootState): GAME_STATUS => state.game.status;

export const selectUserAnswers = (state: RootState): ANSWER[] => state.game.userAnswers;

export const selectGame = (state: RootState) => state.game;

export const selectCountMistakes = (state: RootState): number => state.game.countMistakes;
