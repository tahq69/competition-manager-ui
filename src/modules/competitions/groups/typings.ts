import { Id } from "@/typings";

export interface DisciplineRouteParams {
  cm: Id;
  discipline: Id;
}

export interface GroupRouteParams extends DisciplineRouteParams {
  group: Id;
}

export interface CategoryRouteParams extends GroupRouteParams {
  category: Id;
}

export interface FetchGroupsPayload {
  competition_id: Id;
  discipline_id: Id;
}

export interface FetchCategoriesPayload {
  competition_id: Id;
  discipline_id: Id;
}
