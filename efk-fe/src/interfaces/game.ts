import { ANSWER, GAME_MODE, GAME_STATUS } from '../enums';

export interface Game {
  mode: GAME_MODE;
  status: GAME_STATUS;
  userAnswers: ANSWER[];
  countMistakes: number;
}
