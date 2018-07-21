import { Id } from "@/typings";

export interface FetchGroupsPayload {
  competition_id: Id;
  discipline_id: Id;
}

export interface FetchCategoriesPayload extends FetchGroupsPayload {
  category_group_id: Id;
}
