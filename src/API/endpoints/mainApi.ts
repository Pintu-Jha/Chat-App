import {
  Create_Chat,
  Get_All_Message,
  Get_Available_User,
  Get_User_Chat_List,
} from '../../config/url';
import {baseApi} from '../apiSlice';

export interface Avatar {
  url: string;
  localPath: string;
  _id: string;
}
export interface participant {
  _id: string;
  avatar: Avatar;
  username: string;
  email: string;
  role: string;
  loginType: string;
  isEmailVerified: boolean;
  createdAt: number;
  updatedAt: number;
}
export interface sender {
  _id: string;
  avatar: Avatar;
  username: string;
  email: string;
}
export interface senderDetails {
  _id: string;
  createdAt: number;
  updatedAt: number;
  chat: string;
  content: string;
  attachments: [];
}

export interface User {
  success: boolean | undefined;
  message: string | undefined;
  data: User | undefined;
  statusCode: number | undefined;
  _id: string;
  name: string;
  participants: participant[];
  lastMessage: lastMessage;
  createdAt: number;
  updatedAt: number;
  isGroupChat: boolean;
}
// export interface data {
//   _id: string;
//   name: string;
//   username: string;
//   email: string;
// }
interface getAllMessageFromSender {
  _id: string;
  sender: sender;
  createdAt: number;
  updatedAt: number;
  chat: string;
  content: string;
  attachments: [];
}
export interface lastMessage {
  _id: string;
  sender: sender;
  senderDetails: senderDetails;
}
export interface GetAllMessageResponse {
  statusCode: number;
  data: getAllMessageFromSender[];
  message: string;
  success: boolean;
}
export interface GetAvailableUserChatListResponse {
  statusCode: number;
  data: User[];
  message: string;
  success: boolean;
}
export interface GetAvailableUserResponse {
  statusCode: number;
  data: User[];
  message: string;
  success: boolean;
}
export interface GetCreateChatResponse {
  statusCode: number;
  data: User;
  lastMessage: lastMessage;
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
    getUsersChatList: builder.query<GetAvailableUserChatListResponse, void>({
      query: () => ({
        url: Get_User_Chat_List,
      }),
    }),
    createChat: builder.mutation<GetCreateChatResponse, {receiverId: string}>({
      query: ({receiverId}) => ({
        url: `${Create_Chat}/${receiverId}`,
        method: 'POST',
      }),
    }),
    getAllMessage: builder.query<GetAllMessageResponse, {roomId: string}>({
      query: ({roomId}) => ({
        url: `${Get_All_Message}/${roomId}`,
      }),      
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAvailableUserQuery,
  useGetUsersChatListQuery,
  useCreateChatMutation,
  useGetAllMessageQuery,
} = mainApi;
