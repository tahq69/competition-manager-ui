import { middleware, roles } from "@/components/auth";
import { Id } from "@/types";

export class DisciplineAuth {
  public static async canEdit(discipline: Id, cm: Id) {
    return await middleware.hasAllTeamRoles({ cm }, [
      roles.MANAGE_COMPETITIONS,
      roles.MANAGE_COMPETITION_DISCIPLINES
    ]);
  }

  public static async canCreate(cm: Id) {
    return await middleware.hasAllTeamRoles({ cm }, [
      roles.CREATE_COMPETITIONS,
      roles.MANAGE_COMPETITIONS,
      roles.MANAGE_COMPETITION_DISCIPLINES
    ]);
  }
}
