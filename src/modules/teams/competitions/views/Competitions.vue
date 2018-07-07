<script lang="ts">
import Vue from "vue";

import { teamCompetitions } from "@/router/routes";
import { Paging, SortDirection, PagingParams } from "@/helpers";

import cmService from "#/competitions/service";
import { Competition } from "#/competitions/models/competition";
import { cmDetailsRoute } from "#/competitions/details/routes";

import ManageCompetitionLink from "#/competitions/components/ManageCompetitionLink.vue";

export default Vue.extend({
  name: "TeamCompetitions",

  components: { ManageCompetitionLink },

  props: {
    team: { type: [String, Number], required: true },
    page: { type: [String, Number], required: true },
    pageSize: { type: [String, Number], required: true },
    sort: { type: String, required: true },
    direction: { type: String, required: true }
  },

  data: () => ({
    loading: false,
    totalItems: 1000000,
    competitions: [] as Competition[]
  }),

  computed: {
    currentPage(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.page.toString()) || 1;
    },

    currentPageSize(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.pageSize.toString()) || 10;
    },

    defaultSort(): any {
      return { prop: this.sort, order: this.direction };
    }
  },

  methods: {
    onDataChange({
      page = "1",
      direction = "descending",
      sort = "id",
      pageSize = "10"
    }: PagingParams) {
      this.$router.push({
        name: teamCompetitions.name,
        params: {
          page: page.toString(),
          pageSize: pageSize.toString(),
          sort,
          direction
        }
      });
    },

    onPageChange(page: string) {
      // trigger route change when users updates pagination.
      this.onDataChange({
        page,
        pageSize: this.pageSize,
        direction: this.direction as any,
        sort: this.sort
      });
    },

    onPageSizeChange(pageSize: string) {
      // trigger route change when users updates pagination.
      this.onDataChange({
        page: 1,
        pageSize,
        direction: this.direction as any,
        sort: this.sort
      });
    },

    onSortChange({ order, prop }: { order: SortDirection; prop: string }) {
      // trigger route change when users updates sorting properties.
      this.onDataChange({
        page: 1,
        pageSize: this.pageSize,
        direction: order,
        sort: prop
      });
    },

    async fetchPage() {
      this.loading = true;

      const page = this.currentPage;
      const pageSize = this.currentPageSize;
      const direction = this.direction as SortDirection;
      const paging = new Paging(page, pageSize, this.sort, direction);
      const payload = { paging, team_id: this.team };
      const paginated = await cmService.fetchTeamCompetitions(payload);

      this.competitions = paginated.items;
      this.totalItems = paginated.total;

      this.loading = false;
    },

    onCurrentChange(cm: Competition) {
      this.$router.push(cmDetailsRoute({ cm: cm.id }));
    }
  },

  created() {
    this.log = this.$logger.component(this);

    // fetch data on component initial load.
    this.fetchPage();

    // update when page/pageSize/sort/direction is changed.
    this.$watch(
      () => [this.page, this.sort, this.direction, this.pageSize].join(),
      () => this.fetchPage()
    );
  }
});
</script>

<template>
  <div id="team-competitions"
       v-loading="loading">
    <el-table :data="competitions"
              :default-sort="defaultSort"
              highlight-current-row
              @current-change="onCurrentChange"
              @sort-change="onSortChange">
      <el-table-column prop="title"
                       label="Title"
                       sortable="custom">
        <template slot-scope="cm">
          {{ cm.row.title }}
        </template>
      </el-table-column>

      <el-table-column prop="judge_name"
                       label="Judge"
                       sortable="custom">
        <template slot-scope="cm">
          {{ cm.row.judge_name }}
        </template>
      </el-table-column>

      <el-table-column prop="organization_date"
                       label="Organization date"
                       sortable="custom">
        <template slot-scope="cm">
          {{ cm.row.organization_date | formatDate }}
        </template>
      </el-table-column>

      <el-table-column>
        <template slot-scope="cm">
          <ManageCompetitionLink :cm="cm.row.team_id"
                                 @click.stop
                                 title="Edit competition details"
                                 icon="el-icon-edit"
                                 type="primary"
                                 button
                                 circle
                                 mini/>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="pagination-row">
      <el-pagination @current-change="onPageChange"
                     @size-change="onPageSizeChange"
                     layout="total, prev, pager, next, sizes"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size="currentPageSize"
                     :total="totalItems">
      </el-pagination>
    </el-row>
  </div>
</template>
