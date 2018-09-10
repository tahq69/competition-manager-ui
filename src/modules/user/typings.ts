import { Id } from "@/typings";
import { Paging } from "@/helpers";

export type MessagesType = "inbox" | "outbox";

export interface FetchProfilePayload {
  id?: Id;
}

export interface ResetPasswordPayload {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

export interface FetchMessagesPayload {
  outbox?: boolean;
  paging: Paging;
}

export interface FetchMessagePayload {
  id: Id;
}

export interface ReplyOnMessagePayload {
  id: Id;
  subject: string;
  body: string;
  importance_level?: number;
}
