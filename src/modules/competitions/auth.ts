import { middleware as auth, roles } from "@/components/auth";
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
    return await auth.hasAnyTeamRole(opt, requiredRoles);
  }

  public static async canCreate(opt: ICreate): Promise<boolean> {
    return await auth.hasTeamRole(opt, roles.CREATE_COMPETITIONS);
  }
}
