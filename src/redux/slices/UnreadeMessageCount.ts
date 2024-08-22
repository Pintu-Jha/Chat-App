import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatListItemInterface, ChatMessageInterface } from '../../components/interfaces/chat';

interface updateLastMessageState {
    UnreadeMessageCount: ChatMessageInterface[] | null;
}

const initialState: updateLastMessageState = {
    UnreadeMessageCount: null,
};

const UnreadeMessage = createSlice({
  name: 'UnreadeMessageCount',
  initialState,
  reducers: {
    UnreadeMessageCount: (
      state,
      action: PayloadAction<{
        UnreadeMessageCount: ChatMessageInterface[] ;
      }>,
    ) => {
      state.UnreadeMessageCount = action.payload.UnreadeMessageCount;
    },
  },
});

export const { UnreadeMessageCount } = UnreadeMessage.actions;

export default UnreadeMessage.reducer;
