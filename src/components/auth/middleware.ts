import Vue from "vue";

import { getters, store } from "@/store";
import { Id } from "@/typings";
import * as sysRoles from "@/components/auth/roles";
import {
  ICompetition,
  IFetchCompetition
} from "@/components/auth/store/typings";

const log = Vue.logger.group("auth.middleware");

interface ITeamOption {
  cm?: Id;
  team?: Id;
}

export class Middleware {
  public static isAuthenticated(): boolean {
    return getters.isAuthenticated;
  }

  public static hasRole(role: string): boolean {
    if (!getters.isAuthenticated) return false;

    // if user has an super_admin role, allow him to do anything
    if (getters.hasRole(sysRoles.SUPER_ADMIN)) return true;

    return getters.hasRole(role);
  }

  public static async hasTeamRole(
    { cm, team }: ITeamOption,
    role: string
  ): Promise<boolean> {
    log("hasTeamRole()", { opt: { cm, team }, role });

    if (!this.isAuthenticated()) return false;
    if (!cm && !team)
      throw new Error("Team or competition should be provided.");

    // if user has an super_admin role, allow him to do anything
    if (getters.hasRole(sysRoles.SUPER_ADMIN)) return true;

    if (!team && cm) {
      const payload: IFetchCompetition = { type: "fetchCompetition", id: cm };
      const competition: ICompetition = await store.dispatch(payload);
      return getters.hasTeamRole(competition.team_id.toString(), role);
    }

    if (team) return getters.hasTeamRole(team.toString(), role);

    return false;
  }

  public static hasAnyRole(roles: string[]): boolean {
    if (!getters.isAuthenticated) return false;

    const hasAny = roles.find(role => Middleware.hasRole(role));

    return !!hasAny;
  }

  public static async hasAnyTeamRole(opt: ITeamOption, roles: string[]) {
    log("hasAnyTeamRole()", { opt, roles, auth: getters.isAuthenticated });
    if (!getters.isAuthenticated) return false;

    return await roles.reduce(async (acc, role) => {
      if ((await acc) || (await Middleware.hasTeamRole(opt, role))) return true;
      return false;
    }, Promise.resolve(false));
  }

  public static hasAllRoles(roles: string[]): boolean {
    if (!getters.isAuthenticated) return false;

    const hasNoAny = roles.find(role => !Middleware.hasRole(role));

    return !hasNoAny;
  }

  public static async hasAllTeamRoles(opt: ITeamOption, roles: string[]) {
    if (!this.isAuthenticated()) return false;

    return await roles.reduce(async (acc, role) => {
      if ((await acc) && (await Middleware.hasTeamRole(opt, role))) return true;
      return false;
    }, Promise.resolve(true));
  }
}
