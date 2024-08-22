import { ChatListItemInterface } from "./chat";

export interface APISuccessResponseInterface {
  statusCode: number ;
  data: any ;
  message: string ;
  success: boolean;
}
