import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../interfaces';
import { categoryAdapter } from '../entityAdapters';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../thunks';

const initialState = categoryAdapter.getInitialState();

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, { payload }: PayloadAction<Category[]>) => {
        categoryAdapter.addMany(state, payload);
      })
      .addCase(createCategory.fulfilled, (state, { payload }: PayloadAction<Category>) => {
        categoryAdapter.addOne(state, payload);
      })
      .addCase(updateCategory.fulfilled, (state, { payload }: PayloadAction<Category>) => {
        categoryAdapter.updateOne(state, { id: payload.id, changes: payload });
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }: PayloadAction<number>) => {
        categoryAdapter.removeOne(state, payload);
      });
  },
});

export const categoryReducer = categorySlice.reducer;
