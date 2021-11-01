import { GAME_MODE } from '../constants';

export const isGameModeTrain = (gameMode: GAME_MODE): boolean => gameMode === GAME_MODE.TRAIN;
