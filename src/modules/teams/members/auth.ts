import { middleware as auth, roles } from "@/components/auth"
import { Id } from "@/types"

interface IEdit {
  team: Id
}

export class TeamMemberAuth {
  public static async canEdit(opt: IEdit): Promise<boolean> {
    const requiredRoles = [roles.CREATE_TEAMS, roles.MANAGE_TEAMS]
    if (await auth.hasAnyRole(requiredRoles)) return true

    // TODO: implement check on authentificated user manager status in a
    // provided team.
    return false
  }
}
