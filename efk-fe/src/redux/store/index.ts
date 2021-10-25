import { configureStore, Store, ThunkAction, Action } from '@reduxjs/toolkit';
import { categoryReducer, wordReducer } from '../slices';

export const makeStore = (): Store => {
  return configureStore({
    reducer: {
      categories: categoryReducer,
      words: wordReducer,
    },
  });
};

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
