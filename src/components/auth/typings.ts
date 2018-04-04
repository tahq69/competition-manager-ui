import { Id } from "@/typings";

export interface IUserRole {
  key: string;
}

export interface IAuthUser {
  id: Id;
  email: string;
  name: string;
  roles: IUserRole[];
  team_roles: { [key: string]: IUserRole[] };
}

export interface ILogin {
  username: string;
  password: string;
  client_id: number;
  client_secret: string;
  grant_type: "password";
  scope: "*";
}

export interface IRegister {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}

export interface ICredentials {
  username: string;
  password: string;
}
