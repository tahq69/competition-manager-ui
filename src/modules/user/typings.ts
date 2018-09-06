import { Id } from "@/typings";

export interface FetchProfilePayload {
  id?: Id;
}

export interface ResetPasswordPayload {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}
