import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {lastMessage, User} from '../../API/endpoints/mainApi';

interface createChatState {
  statusCode: number | undefined;
  data: User | undefined;
  lastMessage: lastMessage | undefined;
  message: string | undefined;
  success: boolean | undefined;
}

const initialState: createChatState = {
  statusCode: undefined,
  data: undefined,
  lastMessage: undefined,
  message: undefined,
  success: undefined,
};

const createChatSlice = createSlice({
  name: 'createChatData',
  initialState,
  reducers: {
    createChatData: (
      state,
      action: PayloadAction<{
        statusCode: number | undefined;
        data: User | undefined;
        lastMessage: lastMessage | undefined;
        message: string | undefined;
        success: boolean | undefined;
      }>,
    ) => {
      state.statusCode = action.payload.statusCode;
      state.data = action.payload.data;
      state.lastMessage = action.payload.lastMessage;
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
  },
});

export const {createChatData} = createChatSlice.actions;

export default createChatSlice.reducer;
