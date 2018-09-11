import { IPayload } from "@/typings";

export interface MessagesState {
  loading: boolean;
  unreadCount: number;
}

export interface State {
  messages: MessagesState;
}

export interface Getters {
  isMessageCountLoading: boolean;
  getUnreadMessageCount: number;
}

/********************************* MUTATIONS *********************************/

export interface MutateUnreadMessageCount extends IPayload {
  type: "mutateUnreadMessageCount";
  count: number;
}

export interface MutateUnreadMessageCountLoading extends IPayload {
  type: "mutateUnreadMessageCountLoading";
}

/********************************** ACTIONS **********************************/

export interface FetchUnreadMessageCount extends IPayload {
  type: "fetchUnreadMessageCount";
}
