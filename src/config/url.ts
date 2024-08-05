export const localIPAddress = '192.168.60.167';

export const baseUrl = `http://${localIPAddress}:8080/api/v1`;

//authApiEndpoints
export const SIGN_UP = `/users/register`;
export const LOGIN = `/users/login`;
export const LOGIN_WITH_GOOGLE = `/users/google`;

//mainApiEndpoints
export const Get_Available_User = '/chat-app/chats/users';
export const Get_User_Chat_List = '/chat-app/chats';
export const Create_Chat = '/chat-app/chats/c';
export const Get_All_Message = '/chat-app/messages';
export const Send_Message = '/chat-app/messages';
export const Delete_Message = '/chat-app/messages';
export const Update_Avatar = '/users/avatar';
export const Delete_Group_chat = '/chat-app/chats/group';
export const Delete_Chat = '/chat-app/chats/remove'
export const Create_Group_Chat = '/chat-app/chats/group'
export const Group_Chat_Details = '/chat-app/chats/group'
