import { IFetchCompetition } from "./Store/types"

import { middleware as auth, roles } from "@/Components/Auth"
import store from "@/Store"
import { Id } from "@/types"

interface IEdit {
  competition: Id
  team?: Id
}

interface ICreate {
  team: Id
}

export class CompetitionAuth {
  public static async canEdit({ competition, team }: IEdit): Promise<boolean> {
    const requiredRoles = [roles.CREATE_COMPETITIONS, roles.MANAGE_COMPETITIONS]

    if (team) return auth.hasAnyTeamRole(team, requiredRoles)

    const payload: IFetchCompetition = {
      type: "fetchCompetition",
      id: competition,
    }
    await store.dispatch(payload)
    const cm = store.getters.getCmById(competition)

    return auth.hasAnyTeamRole(cm.team_id, requiredRoles)
  }

  public static async canCreate({ team }: ICreate): Promise<boolean> {
    return auth.hasTeamRole(team, roles.CREATE_COMPETITIONS)
  }
}
