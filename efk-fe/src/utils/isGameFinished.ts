import { GAME_STATUS } from '../constants';

export const isGameFinished = (gameStatus: GAME_STATUS): boolean => gameStatus === GAME_STATUS.FINISHED;
