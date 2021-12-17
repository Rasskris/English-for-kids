import { GAME_MODE } from '../enums';

export const isGameModeTrain = (gameMode: GAME_MODE): boolean => gameMode === GAME_MODE.TRAIN;
