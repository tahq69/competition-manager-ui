import { middleware, roles } from "@/components/auth";
import { Id } from "@/typings";

interface IEdit {
  cm: Id;
  team?: Id;
}

export async function canManageCompetitions() {
  return await middleware.hasRole(roles.SUPER_ADMIN);
}

export async function canEditCompetition(opt: IEdit) {
  return await middleware.hasAnyTeamRole(opt, [
    roles.CREATE_COMPETITIONS,
    roles.MANAGE_COMPETITIONS
  ]);
}
