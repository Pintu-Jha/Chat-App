import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import {baseApi } from '../API/apiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
