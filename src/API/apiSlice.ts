import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../config/url';
import {USER_DATA, retrieveItem} from '../utills/CustomAsyncStorage';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: async (headers, {endpoint}) => {
    try {
      const token = await retrieveItem(USER_DATA);
      if (token.accessToken) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      // headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      // headers.set('Access-Control-Allow-Origin', '*');
      // headers.set('Content-Type', 'multipart/form-data');
      return headers;
    } catch (error) {
      console.log('token not found');
    }
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
