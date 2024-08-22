import {configureStore} from '@reduxjs/toolkit';
import {baseApi} from '../API/apiSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import rootReducer from './rootReducer';

const isDevelopment = process.env.NODE_ENV === 'development';

const middleware = (getDefaultMiddleware: any) => {
  if (isDevelopment) {
    // Disable serializableStateInvariantMiddleware in development
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware);
  } else {
    // Use default middleware settings in production
    return getDefaultMiddleware().concat(baseApi.middleware);
  }
};

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
