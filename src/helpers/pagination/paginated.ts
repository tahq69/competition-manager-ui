import { AxiosResponse } from "axios";

type Resolver<T, P = any> = (x: P) => T;

export class Paginated<T, P = any> {
  public currentPage: number;

  public from: number;
  public to: number;

  public total: number;
  public lastPage: number;
  public pageSize: number;

  public nextPageUrl: string;
  public prevPageUrl: string;

  public items: T[];

  constructor(response: AxiosResponse, resolver?: Resolver<T, P>) {
    const data = response.data;
    // tslint:disable:no-bitwise
    this.currentPage = data.current_page | 0;
    this.from = data.from | 0;
    this.to = data.to | 0;
    this.total = data.total | 0;
    this.lastPage = data.last_page | 0;
    this.pageSize = data.per_page | 0;

    this.nextPageUrl = data.next_page_url;
    this.prevPageUrl = data.prev_page_url;

    this.items = [];

    if (resolver) {
      data.data.forEach((row: P) => {
        const entity = resolver(row);
        this.items.push(entity);
      });
    }
  }
}
