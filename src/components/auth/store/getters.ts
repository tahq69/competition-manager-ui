import { Id } from "@/types";
import { IState, IUser } from "./types";

export default {
  user(state: IState): IUser {
    return state.user;
  },

  isAuthenticated(state: IState): boolean {
    return state.user.authenticated;
  },

  roles(state: IState): string[] {
    return state.roles;
  },

  hasRole: (state: IState) => (role: string) => {
    return state.roles.indexOf(role) > -1;
  },

  teamRoles: (state: IState) => (teamId: string): string[] => {
    if (typeof state.team_roles[teamId] === "undefined") return [];
    return state.team_roles[teamId];
  },

  hasTeamRole: (state: IState, getters: any) => (
    teamId: string,
    role: string
  ): boolean => {
    return getters.teamRoles(teamId).indexOf(role) > -1;
  },

  getCmById: (state: IState) => (id: Id) => {
    return state.competitions.find(cm => cm.id.toString() === id.toString());
  }
};
