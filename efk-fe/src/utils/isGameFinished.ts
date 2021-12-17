import { GAME_STATUS } from '../enums';

export const isGameFinished = (gameStatus: GAME_STATUS): boolean => gameStatus === GAME_STATUS.FINISHED;
