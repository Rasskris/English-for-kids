import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT } from '../../constants';
import { CategoryDataToSubmit, CategoryWithWords } from '../../interfaces';
import { clientAPI } from '../../lib';

interface CategoryUpdateParams {
  categoryId: number;
  categoryData: Partial<CategoryDataToSubmit>;
}

export const getAllCategories = createAsyncThunk('categories/getAllCategories', async () => {
  const categories = await clientAPI.get(ENDPOINT.CATEGORIES);

  return categories;
});

export const getCategoryWithWords = createAsyncThunk('categories/getCategory', async (categoryId: string) => {
  const category: CategoryWithWords = await clientAPI.get(`${ENDPOINT.CATEGORIES}/${categoryId}`);

  return category.words;
});

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData: CategoryDataToSubmit) => {
    const createdCategory = await clientAPI.post(ENDPOINT.CATEGORIES, categoryData);

    return createdCategory;
  },
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ categoryId, categoryData }: CategoryUpdateParams) => {
    const updatedCategory = await clientAPI.patch(`${ENDPOINT.CATEGORIES}/${categoryId}`, categoryData);

    return updatedCategory;
  },
);

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId: number) => {
  const deletedCategoryId = await clientAPI.delete(`${ENDPOINT.CATEGORIES}/${categoryId}`);

  return deletedCategoryId;
});
