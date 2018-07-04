export type SortDirection = "asc" | "desc";

export class Paging {
  constructor(
    private page: number,
    private perPage = 20,
    private sort = "id",
    private direction: SortDirection = "desc"
  ) {}

  public get urlParams(): { [key: string]: string } {
    return {
      page: (this.page || 1).toString(),
      per_page: (this.perPage || 20).toString(),
      sort_by: this.sort,
      sort_direction: this.direction
    };
  }
}
