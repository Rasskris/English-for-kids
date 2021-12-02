import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../interfaces';
import { categoriesAdapter } from '../entityAdapters';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../thunks';

const initialState = categoriesAdapter.getInitialState({ loading: false });

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }: PayloadAction<Category[]>) => {
        categoriesAdapter.addMany(state, payload);
        state.loading = false;
      })
      .addCase(createCategory.fulfilled, (state, { payload }: PayloadAction<Category>) => {
        categoriesAdapter.addOne(state, payload);
      })
      .addCase(updateCategory.fulfilled, (state, { payload }: PayloadAction<Category>) => {
        categoriesAdapter.updateOne(state, { id: payload.id, changes: payload });
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }: PayloadAction<number>) => {
        categoriesAdapter.removeOne(state, payload);
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
