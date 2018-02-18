import { middleware as auth, roles } from "@/components/auth"
import { Id } from "@/types"

interface IEdit {
  team: Id
}

export class TeamAuth {
  public static async canEdit(opt: IEdit): Promise<boolean> {
    const requiredRoles = [roles.CREATE_TEAMS, roles.MANAGE_TEAMS]
    return await auth.hasAnyRole(requiredRoles)
  }

  public static async canCreate(): Promise<boolean> {
    return await auth.hasRole(roles.CREATE_TEAMS)
  }
}
