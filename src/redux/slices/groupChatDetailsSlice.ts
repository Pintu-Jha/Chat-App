import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APISuccessResponseInterface} from '../../components/interfaces/api';
import {ChatListItemInterface} from '../../components/interfaces/chat';

const initialState: APISuccessResponseInterface = {
  data: null,
  statusCode: 0,
  message: '',
  success: false,
};

const groupChatDetailsSlice = createSlice({
  name: 'groupChatDetails',
  initialState,
  reducers: {
    groupChatDetails: (
      state,
      action: PayloadAction<{
        data: ChatListItemInterface;
        message: string;
      }>,
    ) => {
      state.data = action.payload.data;
      state.message = action.payload.message;
    },
  },
});

export const {groupChatDetails} = groupChatDetailsSlice.actions;

export default groupChatDetailsSlice.reducer;
