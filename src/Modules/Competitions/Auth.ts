import { middleware, roles } from "@/Components/Auth"
import { Id } from "@/types"

export class CompetitionAuth {
  public static canEdit(competition: Id): boolean {
    return middleware.hasAnyRole(roles.competitions)
  }

  public static canCreate(): boolean {
    return middleware.hasAnyRole(roles.competitions)
  }
}
