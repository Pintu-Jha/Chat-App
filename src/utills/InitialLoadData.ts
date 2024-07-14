import {
  GetCreateChatResponse,
  participant,
  User,
} from '../API/endpoints/mainApi';
import {AuthState} from '../redux/slices/authSlice';

// export const getSender = (loggedUser: participant, users: participant[]): string => {
//     return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
//   };

export const getSenderInfo = (
  loggedUser: AuthState,
  users: User,
): participant => {
  return users.participants[0]._id === loggedUser?.user?._id
    ? users.participants[1]
    : users.participants[0];
};
