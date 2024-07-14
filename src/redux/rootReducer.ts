import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import createChatSlice from './slices/createChatSlice';
import {baseApi} from '../API/apiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  createChat: createChatSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
