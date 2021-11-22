import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryWithWords, SelectedCategory } from '../../interfaces';
import { getCategoryWithWords } from '../thunks';

const initialState: SelectedCategory = {
  name: null,
  words: null,
  isLoading: true,
};

const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryWithWords.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryWithWords.fulfilled, (state, { payload }: PayloadAction<CategoryWithWords>) => {
        state.name = payload.name;
        state.words = payload.words;
        state.isLoading = false;
      });
  },
});

export const selectedCategoryReducer = selectedCategorySlice.reducer;
