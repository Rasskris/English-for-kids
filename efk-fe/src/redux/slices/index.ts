export { categoriesReducer } from './categoriesSlice';
export { selectedCategoryReducer } from './selectedCategorySlice';
export { wordsReducer } from './wordsSlice';
export { userReducer, setAuthUser, clearAuthSuccess } from './userSlice';
export {
  gameReducer,
  switchGameMode,
  addAnswer,
  addMistake,
  startGame,
  finishGame,
  resetGameState,
} from './gameSlice';
