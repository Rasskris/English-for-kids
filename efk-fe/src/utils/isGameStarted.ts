import { GAME_STATUS } from '../enums';

export const isGameStarted = (gameStatus: GAME_STATUS): boolean => gameStatus === GAME_STATUS.STARTED;
