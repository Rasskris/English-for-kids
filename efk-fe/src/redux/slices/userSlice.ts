import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces';
import { signIn, signOut, signUp } from '../thunks';

interface UserState {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  authSuccess: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  isAuth: false,
  authSuccess: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser: (state, { payload }: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = payload;
    },
    clearAuthSuccess: (state) => {
      state.authSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signIn.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.authSuccess = 'Signed up successfully! Please sign in.';
      })
      .addCase(signIn.fulfilled, (state, { payload }: PayloadAction<User>) => {
        state.loading = false;
        state.isAuth = true;
        state.user = payload;
        state.authSuccess = 'Authenticated successfully!';
      })
      .addCase(signOut.fulfilled, () => {
        return initialState;
      });
  },
});

export const userReducer = userSlice.reducer;

export const { setAuthUser, clearAuthSuccess } = userSlice.actions;
