import { ChatListItemInterface } from '../components/interfaces/chat';
import {AuthState} from '../redux/slices/authSlice';
export const getSenderInfo = (
  loggedUser: AuthState,
  users: ChatListItemInterface,
) => {
  return users.participants[0]._id === loggedUser?.user?._id
    ? users.participants[1]
    : users.participants[0];
};
