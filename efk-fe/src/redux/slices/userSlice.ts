import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces';
import { signIn, signOut } from '../thunks';

interface UserState {
  user: User | null;
  isAuth: boolean;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, { payload }: PayloadAction<User>) => {
        state.isAuth = true;
        state.user = payload;
      })
      .addCase(signOut.fulfilled, () => {
        return initialState;
      });
  },
});

export const userReducer = userSlice.reducer;
