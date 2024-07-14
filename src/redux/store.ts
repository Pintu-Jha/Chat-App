import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { baseApi } from '../API/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import createChatSlice from './slices/createChatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createChat: createChatSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch)
