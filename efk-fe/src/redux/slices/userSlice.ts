import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { User } from '../../interfaces';
import { signIn, signOut, signUp } from '../thunks';

interface UserState {
  user: User | null;
  isAuth: boolean;
  authSuccess: string;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  authSuccess: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAuthSuccess: (state) => {
      state.authSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state) => {
        state.authSuccess = 'Sign up successfully! Please sign in.';
      })
      .addCase(signIn.fulfilled, (state, { payload }: PayloadAction<User>) => {
        state.isAuth = true;
        state.user = payload;
        state.authSuccess = 'Authenticated successefully!';
        console.log('user slice', current(state));
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
      });
  },
});

export const userReducer = userSlice.reducer;

export const { clearAuthSuccess } = userSlice.actions;
