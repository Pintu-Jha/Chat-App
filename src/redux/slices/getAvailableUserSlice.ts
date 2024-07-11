import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Avatar {
  url: string;
  localPath: string;
  _id: string;
}

interface User {
  _id: string;
  avatar: Avatar;
  username: string;
  email: string;
}

interface UsersState {
  users: User | null;
  message: string | null;
  isLoading: boolean;
}

const initialState: UsersState = {
  users: null,
  message: null,
  isLoading: false,
};

const getAvailableUserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAvailableUser: (
      state,
      action: PayloadAction<{
        users: User;
        message: string;
      }>,
    ) => {
      state.users = action.payload.users;
      state.message = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const {getAvailableUser} = getAvailableUserSlice.actions;

export default getAvailableUserSlice.reducer;
