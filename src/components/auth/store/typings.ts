import { Id, IPayload } from "@/typings";

export interface ITokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface IRole {
  key: string;
}

export interface IUser {
  authenticated: boolean;
  name: string;
  email: string;
  id: number;
}

export interface ICompetition {
  id: Id;
  team_id: Id;
}

export interface IState {
  loading: boolean;
  user: IUser;
  roles: string[];
  team_roles: { [key: string]: string[] };
  competitions: ICompetition[];
}

export interface Getters {
  user: IUser;
  isAuthenticated: boolean;
  roles: string[];
  isUserLoading: boolean;
  hasRole: (role: string) => boolean;
  teamRoles: (teamId: string) => string[];
  hasTeamRole: (teamId: string, role: string) => boolean;
  getCmById: (id: Id) => ICompetition;
}

/* MUTATIONS */

export interface ILogoutPayload extends IPayload {
  type: "logout";
}

export interface IUpdateUserDetailsPayload extends IPayload {
  type: "updateAuthUserDetails";
  name: string;
  email: string;
  id: number;
  roles: IRole[];
  team_roles: { [key: string]: IRole[] };
}

export interface IUpdateAuthLoadingStatePayload extends IPayload {
  type: "updateAuthLoadingState";
  loading: boolean;
}

export interface IAddCompetitionPayload extends IPayload, ICompetition {
  type: "addCompetition";
}

/* ACTIONS */

export interface IFetchAuthUser extends IPayload {
  type: "fetchAuthUser";
}

export interface IFetchCompetition extends IPayload {
  type: "fetchCompetition";
  id: Id;
}
