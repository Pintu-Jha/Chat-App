import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatListItemInterface } from '../../components/interfaces/chat';

interface updateLastMessageState {
  lastMessageUpdate: ChatListItemInterface[] | null;
}

const initialState: updateLastMessageState = {
  lastMessageUpdate: null,
};

const updateLastMessageSlice = createSlice({
  name: 'updateLastMessage',
  initialState,
  reducers: {
    updateLastMessage: (
      state,
      action: PayloadAction<{
        lastMessage: ChatListItemInterface[] ;
      }>,
    ) => {
      state.lastMessageUpdate = action.payload.lastMessage;
    },
  },
});

export const { updateLastMessage } = updateLastMessageSlice.actions;

export default updateLastMessageSlice.reducer;
