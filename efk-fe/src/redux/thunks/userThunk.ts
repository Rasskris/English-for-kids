import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT } from '../../constants';
import { User } from '../../interfaces';
import { clientAPI } from '../../lib';

interface UserData extends User {
  [index: string]: string;
  password: string;
}

export const signUp = createAsyncThunk('user/signUp', async (userData: UserData) => {
  const user = await clientAPI.auth(`${ENDPOINT.AUTHENTICATION}/signup`, userData);

  return user;
});

export const signIn = createAsyncThunk('user/signIn', async (userData: Omit<UserData, 'name'>) => {
  const user: User = await clientAPI.auth(`${ENDPOINT.AUTHENTICATION}/signin`, userData);

  return user;
});

export const signOut = createAsyncThunk('user/signOut', async () => {
  const user = await clientAPI.auth(`${ENDPOINT.AUTHENTICATION}/signout`);

  return user;
});
