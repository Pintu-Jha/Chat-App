import { Create_Chat, Get_Available_User, Get_User_Chat_List } from '../../config/url';
import { baseApi } from '../apiSlice';

interface Avatar {
  url: string;
  localPath: string;
  _id: string;
}
export interface participant {
  _id:string
  avatar: Avatar;
  username:string;
  email:string
  role:string;
  loginType:string;
  isEmailVerified:boolean;
  createdAt:number;
  updatedAt:number
}

interface User {
  _id: string;
  name:string;
  participants:participant[];
  createdAt:number;
  updatedAt:number;
  isGroupChat:boolean
}

export interface GetAvailableUserResponse {
  statusCode: number;
  data: User[];
  message: string;
  success: boolean;
}

export const mainApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAvailableUser: builder.query<GetAvailableUserResponse, void>({
      query: () => ({
        url: Get_Available_User,
      }),
    }),
    getUsersChatList: builder.query<GetAvailableUserResponse, void>({
      query: () => ({
        url: Get_User_Chat_List,
      }),
    }),
    createChat: builder.mutation<GetAvailableUserResponse, {userId: string}>({
      query: ({userId}) => ({
        url: `${Create_Chat}/${userId}`,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetAvailableUserQuery,useGetUsersChatListQuery ,useCreateChatMutation} = mainApi;
