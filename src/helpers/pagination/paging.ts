import { SortDirection } from "@/typings";

export class Paging {
  constructor(
    private page: number,
    private pageSize = 10,
    private sort = "id",
    private direction: SortDirection = "descending"
  ) {}

  public get urlParams(): { [key: string]: string } {
    return {
      page: (this.page || 1).toString(),
      per_page: (this.pageSize || 10).toString(),
      sort_by: this.sort,
      sort_direction: this.direction
    };
  }
}
