import {APISuccessResponseInterface} from '../../components/interfaces/api';
import {
  DeleteGroupChatResponse,
  DeleteMessageResponse,
} from '../../components/interfaces/chat';
import {
  Create_Chat,
  Create_Group_Chat,
  Delete_Chat,
  Delete_Group_chat,
  Get_All_Message,
  Get_Available_User,
  Get_User_Chat_List,
  Group_Chat_Details,
  Leave_GroupChat,
  Remove_GroupChat_Participent,
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
    deleteChat: builder.mutation<DeleteGroupChatResponse, {chatId: string}>({
      query: ({chatId}) => ({
        url: `${Delete_Chat}/${chatId}`,
        method: 'DELETE',
      }),
    }),
    CreateGroupChat: builder.mutation<
      APISuccessResponseInterface,
      {CreateGroupData: any}
    >({
      query: ({CreateGroupData}) => ({
        url: `${Create_Group_Chat}`,
        method: 'POST',
        body: CreateGroupData,
      }),
    }),
    getGroupChatDetails: builder.query<
      APISuccessResponseInterface,
      {roomId: any}
    >({
      query: ({roomId}) => ({
        url: `${Group_Chat_Details}/${roomId}`,
      }),
    }),
    RemoveGroupChatParticipent: builder.mutation<
      APISuccessResponseInterface,
      {roomId: any; participentId: any}
    >({
      query: ({roomId, participentId}) => ({
        url: `${Remove_GroupChat_Participent}/${roomId}/${participentId}`,
        method: 'DELETE',
      }),
    }),
    AddGroupChatParticipent: builder.mutation<
      APISuccessResponseInterface,
      {roomId: any; participentId: any}
    >({
      query: ({roomId, participentId}) => ({
        url: `${Remove_GroupChat_Participent}/${roomId}/${participentId}`,
        method: 'POST',
      }),
    }),
    leaveGroupCHat: builder.mutation<
    APISuccessResponseInterface,
    {roomId: any}
  >({
    query: ({roomId}) => ({
      url: `${Leave_GroupChat}/${roomId}`,
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
  useLazyGetAllMessageQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useDeleteGroupChatMutation,
  useDeleteChatMutation,
  useCreateGroupChatMutation,
  useGetGroupChatDetailsQuery,
  useRemoveGroupChatParticipentMutation,
  useAddGroupChatParticipentMutation,
  useLeaveGroupCHatMutation
} = mainApi;
