/* eslint-disable prettier/prettier */
import { AppState } from '../store';
import { categoriesAdapter, wordsAdapter } from '../entityAdapters';
import { ANSWER, GAME_MODE, GAME_STATUS } from '../../constants';
import { Game, SelectedCategory } from '../../interfaces';

export const { selectAll: selectCategories,
 } = categoriesAdapter.getSelectors<AppState>(
  (state) => state.categories,
);

export const selectLoadingStatus = (sliceName: string) => (state: AppState): boolean => state[sliceName].loading;

export const selectCategoriesLoadingStatus = (state: AppState): boolean => state.categories.loading;

export const { selectAll: selectWords } = wordsAdapter.getSelectors<AppState>((state) => state.words);

export const selectGameMode = (state: AppState): GAME_MODE => state.game.mode;

export const selectGameStatus = (state: AppState): GAME_STATUS => state.game.status;

export const selectUserAnswers = (state: AppState): ANSWER[] => state.game.userAnswers;

export const selectGame = (state: AppState): Game => state.game;

export const selectCountMistakes = (state: AppState): number => state.game.countMistakes;

export const getSelectedCategory = (state: AppState): SelectedCategory => state.selectedCategory;

export const selectAuthStatus = (state: AppState): boolean => state.user.isAuth;