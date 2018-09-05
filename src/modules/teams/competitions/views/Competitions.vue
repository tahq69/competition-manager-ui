<script lang="ts">
import Vue from "vue";

import { teamCompetitions } from "@/router/routes";
import { Paging, SortDirection, PagingParams } from "@/helpers";
import { table } from "@/components/mixins";

import { Competition } from "@/modules/competitions/models";
import { cmDetailsRoute } from "@/modules/competitions/routes";
import { fetchCompetitions } from "@/modules/competitions/service";

export default Vue.extend({
  name: "TeamCompetitions",

  mixins: [table],

  props: {
    team: { type: [String, Number], required: true }
  },

  data: () => ({
    competitions: [] as Competition[],
    route: teamCompetitions // make sure table mixin knows current route
  }),

  methods: {
    async fetchPage(paging: Paging) {
      const payload = { paging, team_id: this.team };
      const paginated = await fetchCompetitions(payload);

      this.competitions = paginated.items;
      return paginated.total;
    },

    onCellClick(row: Competition, column: any) {
      if (column.property !== "actions")
        this.$router.push(cmDetailsRoute({ cm: row.id }));
    }
  }
});
</script>

<template>
  <div id="team-competitions"
       v-loading="loading">
    <el-table class="row-as-link"
              :data="competitions"
              :default-sort="defaultSort"
              @cell-click="onCellClick"
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

      <el-table-column prop="actions">
        <template slot-scope="cm">
          <ManageCompetitionLink :cm="cm.row.team_id"
                                 title="Edit competition details"
                                 icon="edit"
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
                     :page-sizes="pageSizes"
                     :page-size="currentPageSize"
                     :total="totalItems">
      </el-pagination>
    </el-row>
  </div>
</template>
