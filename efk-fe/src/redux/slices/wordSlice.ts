import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { wordAdapter } from '../entityAdapters';
import { getCategoryWithWords, createWord, updateWord, deleteWord } from '../thunks';
import { Word } from '../../interfaces';

const initialState = wordAdapter.getInitialState();

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryWithWords.fulfilled, (state, { payload }: PayloadAction<Word[]>) => {
        wordAdapter.addMany(state, payload);
      })
      .addCase(createWord.fulfilled, (state, { payload }: PayloadAction<Word>) => {
        wordAdapter.addOne(state, payload);
      })
      .addCase(updateWord.fulfilled, (state, { payload }: PayloadAction<Word>) => {
        wordAdapter.updateOne(state, { id: payload.id, changes: payload });
      })
      .addCase(deleteWord.fulfilled, (state, { payload }: PayloadAction<number>) => {
        wordAdapter.removeOne(state, payload);
      });
  },
});

export const wordReducer = wordSlice.reducer;
