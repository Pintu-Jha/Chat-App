import {APISuccessResponseInterface} from '../../components/interfaces/api';
import {
  DeleteGroupChatResponse,
  DeleteMessageResponse,
} from '../../components/interfaces/chat';
import {
  Create_Chat,
  Delete_Group_chat,
  Get_All_Message,
  Get_Available_User,
  Get_User_Chat_List,
  Send_Message,
} from '../../config/url';
import {baseApi} from '../apiSlice';

export const mainApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAvailableUser: builder.query<APISuccessResponseInterface, void>({
      query: () => ({
        url: Get_Available_User,
      }),
    }),
    getUsersChatList: builder.query<APISuccessResponseInterface, void>({
      query: () => ({
        url: Get_User_Chat_List,
      }),
    }),
    createChat: builder.mutation<
      APISuccessResponseInterface,
      {receiverId: string}
    >({
      query: ({receiverId}) => ({
        url: `${Create_Chat}/${receiverId}`,
        method: 'POST',
      }),
    }),
    getAllMessage: builder.query<APISuccessResponseInterface, {roomId: string}>(
      {
        query: ({roomId}) => ({
          url: `${Get_All_Message}/${roomId}`,
        }),
      },
    ),
    sendMessage: builder.mutation<
      APISuccessResponseInterface,
      {roomId: string; content: string}
    >({
      query: ({roomId, content}) => ({
        url: `${Send_Message}/${roomId}`,
        method: 'POST',
        body: {content},
      }),
    }),
    deleteMessage: builder.mutation<
      DeleteMessageResponse,
      {roomId: string; selectedItemId: string}
    >({
      query: ({roomId, selectedItemId}) => ({
        url: `${Send_Message}/${roomId}/${selectedItemId}`,
        method: 'DELETE',
      }),
    }),
    deleteGroupChat: builder.mutation<
      DeleteGroupChatResponse,
      {chatId: string}
    >({
      query: ({chatId}) => ({
        url: `${Delete_Group_chat}/${chatId}`,
        method: 'DELETE',
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
  useSendMessageMutation,
  useDeleteMessageMutation,
  useDeleteGroupChatMutation,
} = mainApi;
