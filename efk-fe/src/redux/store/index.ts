import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  categoriesReducer,
  wordsReducer,
  gameReducer,
  userReducer,
  selectedCategoryReducer,
} from '../slices';

export const makeStore = () => {
  return configureStore({
    reducer: {
      categories: categoriesReducer,
      selectedCategory: selectedCategoryReducer,
      words: wordsReducer,
      game: gameReducer,
      user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
