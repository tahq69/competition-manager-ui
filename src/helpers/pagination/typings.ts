import { SortDirection } from "@/typings";

export interface PagingParams {
  direction?: SortDirection;
  pageSize?: string | number;
  page?: string | number;
  sort?: string;
}
