import {LOGIN, SIGN_UP} from '../../config/url';
import {baseApi} from '../apiSlice';

interface LoginRequest {
  password: string;
  username: string;
}

interface SignupRequest {
  username: string;
  password: string;
  email: string;
}

interface Avatar {
  url: string;
  localPath: string;
  _id: string;
}

interface User {
  _id: string;
  avatar: Avatar;
  username: string;
  email: string;
  role: string;
  loginType: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AuthResponse {
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: credentials => ({
        url: LOGIN,
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: credentials => ({
        url: SIGN_UP,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useLoginMutation, useSignupMutation} = authApi;
