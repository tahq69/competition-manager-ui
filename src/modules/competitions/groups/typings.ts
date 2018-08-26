import { Id } from "@/typings";
import { DisplayType } from "@/modules/competitions/models";

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

export interface FetchGroupPayload {
  competition_id: Id;
  discipline_id: Id;
  id: Id;
}

export interface FetchCategoryPayload {
  competition_id: Id;
  discipline_id: Id;
  category_group_id: Id;
  id: Id;
}

export interface SaveGroupPayload {
  competition_id: Id;
  discipline_id: Id;
  id: Id;

  max: number;
  min: number;
  rounds: number;
  short: string;
  time: number;
  title: string;
}

export interface SaveCategoryPayload {
  competition_id: Id;
  discipline_id: Id;
  category_group_id: Id;
  id: Id;

  display_type: DisplayType;
  max: number;
  min: number;
  short: string;
  title: string;
}
