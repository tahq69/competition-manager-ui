import { middleware, roles } from "@/components/auth";
import { Id } from "@/typings";

export async function canManageArea(cm: Id, area: Id) {
  return await middleware.hasTeamRole({ cm }, roles.MANAGE_COMPETITION_AREAS);
}

export async function canCreateArea(cm: Id) {
  return await middleware.hasTeamRole({ cm }, roles.MANAGE_COMPETITION_AREAS);
}
