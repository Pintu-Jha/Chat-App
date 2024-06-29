import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../redux/store';
import {baseUrl} from '../config/url';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, {getState,}) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    // if (extra && extra?.idToken) {
    //   headers.set('Authorization', `Bearer ${extra.idToken}`);
    // }
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
