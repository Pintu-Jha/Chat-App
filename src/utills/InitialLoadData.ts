import { participant} from "../API/endpoints/mainApi";

// export const getSender = (loggedUser: participant, users: participant[]): string => {
//     return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
//   };
  
  export const getSenderInfo = (loggedUser: participant, users: participant[]): participant => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };
  