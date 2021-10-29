import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers, Reducer, AnyAction } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { categoriesReducer, wordsReducer, gameReducer } from '../slices';

const appReducer = combineReducers({
  categories: categoriesReducer,
  words: wordsReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return appReducer(state, action);
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = makeStore();

export const storeWrapper = createWrapper<AppStore>(makeStore);

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
