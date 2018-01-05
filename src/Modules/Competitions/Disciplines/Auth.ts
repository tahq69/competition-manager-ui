import { middleware, roles } from "@/Components/Auth"
import { Id } from "@/types"

export class DisciplineAuth {
  public static canEdit(discipline: Id, competition: Id): boolean {
    return middleware.hasAnyRole(roles.competitions)
  }

  public static canCreate(competition: Id): boolean {
    return middleware.hasAnyRole(roles.competitions)
  }
}
