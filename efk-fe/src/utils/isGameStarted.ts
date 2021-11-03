import { GAME_STATUS } from '../constants';

export const isGameStarted = (gameStatus: GAME_STATUS): boolean => gameStatus === GAME_STATUS.STARTED;
