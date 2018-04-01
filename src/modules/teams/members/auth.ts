import { middleware, roles } from "@/components/auth"
import { Id } from "@/types"

interface IEdit {
  team: Id
}

export class TeamMemberAuth {
  public static async canEdit(opt: IEdit): Promise<boolean> {
    // Global CREATE_TEAMS role allows edit any team details.
    if (middleware.hasRole(roles.CREATE_TEAMS)) return true

    // Checks the current user manager of the team and have role to manage
    // members in it.
    const canManageTeamMembers = await middleware.hasTeamRole(
      { team: opt.team },
      roles.MANAGE_MEMBERS
    )

    return canManageTeamMembers
  }
}
