import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Avatar {
  url: string;
  localPath: string;
  _id: string;
}

interface User {
  _id?: string;
  avatar?: Avatar;
  username?: string;
  email?: string;
  role?: string;
  loginType?: string;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  photo: any | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  message: string | null;
  isLogging: boolean | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  message: null,
  isLogging: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string | null;
        refreshToken: string;
        message: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.message = action.payload.message;
      state.isLogging = true;
    },
    logout: state => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLogging = false;
    },
  },
});

export const {setUser, logout} = authSlice.actions;

export default authSlice.reducer;
