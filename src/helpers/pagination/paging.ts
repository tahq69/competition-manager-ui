import { SortDirection } from "@/typings";

export class Paging {
  constructor(
    public page: number,
    public pageSize = 10,
    public sort = "id",
    public direction: SortDirection = "descending"
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
