<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { Paging } from "@/helpers";
import { manageCompetitions } from "@/router/routes";
import { table } from "@/components/mixins";

import { Competition } from "@/modules/competitions/models";
import { cmDetailsRoute } from "@/modules/competitions/routes";
import { fetchCompetitions } from "@/modules/competitions/service";

export default Vue.extend({
  name: "ManageCompetitions",

  mixins: [table],

  data: () => ({ competitions: [] as Competition[] }),

  methods: {
    async fetchPage(paging: Paging) {
      const payload = { paging, owned: true };
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
  <el-card id="manage-competitions">
    <div slot="header"
         class="clearfix">
      {{ $t('competitions.manage_competitions_grid_title') }}
    </div>

    <div v-loading="loading">
      <el-table class="row-as-link"
                :data="competitions"
                :default-sort="defaultSort"
                @sort-change="onSortChange"
                @cell-click="onCellClick">
        <el-table-column prop="id"
                         sortable="custom"
                         width="80"
                         :label="$t('competitions.manage_competitions_grid_head_id')">
        </el-table-column>

        <el-table-column prop="title"
                         sortable="custom"
                         :label="$t('competitions.manage_competitions_grid_head_title')">
        </el-table-column>

        <el-table-column prop="judge_name"
                         sortable="custom"
                         :label="$t('competitions.manage_competitions_grid_head_judge_name')">
        </el-table-column>

        <el-table-column prop="organization_date"
                         sortable="custom"
                         :label="$t('competitions.manage_competitions_grid_head_organization_date')">
          <template slot-scope="competition">
            {{ competition.row.organization_date | formatDateTime }}
          </template>
        </el-table-column>
        <el-table-column prop="actions"
                         fixed="right"
                         width="80">
          <template slot-scope="competition">
            <ManageCompetitionLink :cm="competition.row.id"
                                   mini
                                   circle
                                   button
                                   icon="edit"
                                   type="primary" />
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
  </el-card>
</template>
