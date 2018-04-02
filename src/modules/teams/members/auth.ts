import { middleware, roles } from "@/components/auth"
import { Id } from "@/types"

interface IEdit {
  team: Id
}

export class TeamMemberAuth {
  public static async canEdit(opt: IEdit): Promise<boolean> {
    // Checks the current user manager of the team and have role to manage it.
    return await TeamMemberAuth.hasTeamRole(opt, roles.MANAGE_TEAMS)
  }

  public static async canEditMembers(opt: IEdit): Promise<boolean> {
    // Checks the current user manager of the team and have role to manage
    // members in it.
    return await TeamMemberAuth.hasTeamRole(opt, roles.MANAGE_MEMBERS)
  }

  public static async canEditRoles(opt: IEdit): Promise<boolean> {
    // Checks the current user manager of the team and have role to manage
    // other member roles.
    return await TeamMemberAuth.hasTeamRole(opt, roles.MANAGE_MEMBER_ROLES)
  }

  private static async hasTeamRole(opt: IEdit, role: string): Promise<boolean> {
    // Global CREATE_TEAMS role allows edit any team details.
    if (middleware.hasRole(roles.CREATE_TEAMS)) return true

    const hasRole = await middleware.hasTeamRole({ team: opt.team }, role)

    return hasRole
  }
}
