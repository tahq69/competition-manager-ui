import { AxiosResponse } from "axios";

type Resolver<T> = (x: any) => T;

export class Pagination<T> {
  public static create<T>(response: AxiosResponse, resolver: Resolver<T>) {
    const pagination = new Pagination<T>(response);

    response.data.data.forEach((row: any) => {
      const entity = resolver(row);
      pagination.items.push(entity);
    });

    return pagination;
  }

  public currentPage: number;

  public from: number;
  public to: number;

  public total: number;
  public lastPage: number;
  public perPage: number;

  public nextPageUrl: string;
  public prevPageUrl: string;

  public items: T[];
  public loading: boolean;

  constructor(response: AxiosResponse) {
    const data = response.data;
    // tslint:disable:no-bitwise
    this.currentPage = data.current_page | 0;
    this.from = data.from | 0;
    this.to = data.to | 0;
    this.total = data.total | 0;
    this.lastPage = data.last_page | 0;
    this.perPage = data.per_page | 0;

    this.nextPageUrl = data.next_page_url;
    this.prevPageUrl = data.prev_page_url;

    this.items = [];
    this.loading = false;
  }
}
