/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { GAME_MODE } from '../../constants';

interface Game {
  mode: GAME_MODE;
  isStarted: boolean;
  countRightAnswers: number;
  countWrongAnswers: number;
}

const initialState: Game = {
  mode: GAME_MODE.TRAIN,
  isStarted: false,
  countRightAnswers: 0,
  countWrongAnswers: 0,
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
      state.isStarted = true;
    },
    finishGame: (state) => {
      state.isStarted = false;
    },
  },
});

export const { switchGameMode, startGame, finishGame } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
