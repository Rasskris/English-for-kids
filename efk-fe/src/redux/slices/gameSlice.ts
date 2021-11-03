import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ANSWER, GAME_MODE, GAME_STATUS } from '../../constants';

interface Game {
  mode: GAME_MODE;
  status: GAME_STATUS;
  userAnswers: ANSWER[];
  countMistakes: number;
}

const initialState: Game = {
  mode: GAME_MODE.TRAIN,
  status: GAME_STATUS.NOT_STARTED,
  userAnswers: [],
  countMistakes: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    switchGameMode: (state) => {
      if (state.mode === GAME_MODE.TRAIN) {
        state.mode = GAME_MODE.PLAY;
      } else {
        state.mode = GAME_MODE.TRAIN;
      }
    },
    startGame: (state) => {
      state.status = GAME_STATUS.STARTED;
    },
    finishGame: (state) => {
      state.status = GAME_STATUS.FINISHED;
    },
    addAnswer: (state, { payload }: PayloadAction<ANSWER>) => {
      state.userAnswers.push(payload);
    },
    addMistake: (state) => {
      state.countMistakes += 1;
    },
    resetGameState: () => {
      return initialState;
    },
  },
});

export const { switchGameMode, startGame, finishGame, addAnswer, addMistake, resetGameState } =
  gameSlice.actions;

export const gameReducer = gameSlice.reducer;
