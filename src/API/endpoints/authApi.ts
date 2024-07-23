import {
  LOGIN,
  LOGIN_WITH_GOOGLE,
  SIGN_UP,
  Update_Avatar,
} from '../../config/url';
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
  photo: any | null;
}

export interface AuthResponse {
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}
export interface AvatarResponse {
  statusCode: number;
  data: User;
  message: string;
}
export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: credentials => ({
        url: LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: credentials => ({
        url: SIGN_UP,
        method: 'POST',
        body: credentials,
      }),
    }),
    loginWithGoogle: builder.mutation<AuthResponse, {idToken: string}>({
      query: ({idToken}) => ({
        url: `${LOGIN_WITH_GOOGLE}?token=${idToken}`,
      }),
    }),
    updateUserAvatar: builder.mutation<AvatarResponse, any>({
      query: formData => ({
        url: Update_Avatar,
        method: 'PATCH',
        body: formData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLoginWithGoogleMutation,
  useUpdateUserAvatarMutation,
} = authApi;
