import { middleware, roles } from "@/components/auth";
import { Id } from "@/typings";

interface IEdit {
  cm: Id;
  team?: Id;
}

interface ICreate {
  team: Id;
}

export class CompetitionAuth {
  public static async canEdit(opt: IEdit): Promise<boolean> {
    const requiredRoles = [
      roles.CREATE_COMPETITIONS,
      roles.MANAGE_COMPETITIONS
    ];
    return await middleware.hasAnyTeamRole(opt, requiredRoles);
  }
}
