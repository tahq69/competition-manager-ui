import { PagingParams, SortDirection } from "@/typings";
import { Paging } from "@/helpers";

const validator = (page: string | number) => parseInt(page.toString()) > 0;

export default {
  props: {
    page: { type: [String, Number], required: true, validator },
    pageSize: { type: [String, Number], required: true, validator },
    sort: { type: String, required: true },
    direction: {
      type: String,
      required: true,
      validator: (direction: string) =>
        ["ascending", "descending"].indexOf(direction) > -1
    }
  },

  data: () => ({
    loading: false,
    totalItems: 1000000,
    pageSizes: [10, 20, 50, 100]
  }),

  computed: {
    currentPage(this: any): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.page.toString()) || 1;
    },

    currentPageSize(this: any): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.pageSize.toString()) || 10;
    },

    defaultSort(this: any): any {
      return { prop: this.sort, order: this.direction };
    }
  },

  methods: {
    changeRoute(this: any, p: PagingParams) {
      const page = p.page ? p.page.toString() : "1";
      const pageSize = p.pageSize ? p.pageSize.toString() : "10";

      this.$router.push(
        Object.assign(
          { params: { page, pageSize, sort: p.sort, direction: p.direction } },
          this.route
        )
      );
    },

    onPageChange(this: any, page: string) {
      // trigger route change when users updates pagination.
      this.changeRoute({
        page,
        pageSize: this.pageSize,
        direction: this.direction,
        sort: this.sort
      });
    },

    onPageSizeChange(this: any, pageSize: string) {
      // trigger route change when users updates pagination.
      this.changeRoute({
        page: 1,
        pageSize,
        direction: this.direction,
        sort: this.sort
      });
    },

    onSortChange(this: any, { order, prop }) {
      // trigger route change when users updates sorting properties.
      this.changeRoute({
        page: 1,
        pageSize: this.pageSize,
        direction: order,
        sort: prop
      });
    },

    fetchPageWrapper(this: any) {
      this.loading = true;

      const page = this.currentPage;
      const pageSize = this.currentPageSize;
      const direction = this.direction as SortDirection;
      const paging = new Paging(page, pageSize, this.sort, direction);

      this.fetchPage(paging)
        .then((total: number) => {
          this.totalItems = total;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    }
  },

  created(this: any) {
    // fetch data on component initial load.
    this.fetchPageWrapper();

    // update when page/pageSize/sort/direction is changed.
    this.$watch(
      () => [this.page, this.sort, this.direction, this.pageSize].join(),
      () => this.fetchPageWrapper()
    );
  }
};
