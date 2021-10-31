import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { wordsAdapter } from '../entityAdapters';
import { getCategoryWithWords, createWord, updateWord, deleteWord } from '../thunks';
import { Word } from '../../interfaces';

const initialState = wordsAdapter.getInitialState();

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryWithWords.fulfilled, (state, { payload }: PayloadAction<Word[]>) => {
        wordsAdapter.setAll(state, payload);
      })
      .addCase(createWord.fulfilled, (state, { payload }: PayloadAction<Word>) => {
        wordsAdapter.addOne(state, payload);
      })
      .addCase(updateWord.fulfilled, (state, { payload }: PayloadAction<Word>) => {
        wordsAdapter.updateOne(state, { id: payload.id, changes: payload });
      })
      .addCase(deleteWord.fulfilled, (state, { payload }: PayloadAction<number>) => {
        wordsAdapter.removeOne(state, payload);
      });
  },
});

export const wordsReducer = wordsSlice.reducer;
