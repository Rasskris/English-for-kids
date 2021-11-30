import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { wordsAdapter } from '../entityAdapters';
import { createWord, updateWord, deleteWord, getCategoryWithWords } from '../thunks';
import { Word, CategoryWithWords } from '../../interfaces';

const initialState = wordsAdapter.getInitialState();

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWords: (state, { payload }: PayloadAction<Word[]>) => {
      wordsAdapter.setAll(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryWithWords.fulfilled, (state, { payload }: PayloadAction<CategoryWithWords>) => {
        wordsAdapter.setAll(state, payload.words);
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
