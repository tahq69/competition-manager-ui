import { Id } from "@/typings";

export interface IFetchUserProfile {
  id?: Id;
}

export interface IResetPassword {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}
