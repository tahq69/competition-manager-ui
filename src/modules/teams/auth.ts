import { middleware, roles } from "@/components/auth";
import { Id } from "@/typings";

interface IEdit {
  team: Id;
}

export async function canCreateCompetition(team: Id) {
  const role = roles.CREATE_COMPETITIONS;
  const hasRole = await middleware.hasTeamRole({ team }, role);

  // TODO: we need validate available credits of the current team to allow
  // create new competitions for it.
  return hasRole;
}

export class TeamAuth {
  public static async canEdit(opt: IEdit): Promise<boolean> {
    // Global CREATE_TEAMS role allows edit any team details.
    if (middleware.hasRole(roles.CREATE_TEAMS)) return true;

    // Checks the current user manager of the team and have role to manage it.
    const canManageTeam = await middleware.hasTeamRole(
      { team: opt.team },
      roles.MANAGE_TEAMS
    );

    return canManageTeam;
  }

  public static canCreate(): boolean {
    return middleware.hasRole(roles.CREATE_TEAMS);
  }
}
