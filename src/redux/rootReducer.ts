import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import createChatData from './slices/createChatSlice';
import {baseApi} from '../API/apiSlice';
import updateLastMessage from './slices/UpdateLastMessage';
import UnreadeMessageCount from './slices/UnreadeMessageCount';
import groupChatDetails  from './slices/groupChatDetailsSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  createChat: createChatData,
  updateLastMessage: updateLastMessage,
  UnreadeMessageCount: UnreadeMessageCount,
  GroupChatDetails: groupChatDetails,
  [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
