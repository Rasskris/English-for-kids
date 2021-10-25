import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT } from '../../constants';
import { clientAPI } from '../../lib';

interface WordDataToSend {
  [index: string]: string | Blob;
  name: string;
  translation: string;
  image: Blob;
  audio: Blob;
}

interface WordUpdateParams {
  wordId: number;
  wordData: Partial<WordDataToSend>;
}
export const getWord = createAsyncThunk('words/getWord', async (categoryId: number) => {
  const category = await clientAPI.get(`${ENDPOINT.WORDS}/${categoryId}`);

  return category;
});

export const createWord = createAsyncThunk('words/createWord', async (wordData: WordDataToSend) => {
  const createdCategory = await clientAPI.post(ENDPOINT.WORDS, wordData);

  return createdCategory;
});

export const updateWord = createAsyncThunk(
  'words/updateWord',
  async ({ wordId, wordData }: WordUpdateParams) => {
    const updatedCategory = await clientAPI.patch(`${ENDPOINT.WORDS}/${wordId}`, wordData);

    return updatedCategory;
  },
);

export const deleteWord = createAsyncThunk('words/deleteWord', async (wordId: number) => {
  const deletedWordId = await clientAPI.delete(`${ENDPOINT.WORDS}/${wordId}`);

  return deletedWordId;
});
