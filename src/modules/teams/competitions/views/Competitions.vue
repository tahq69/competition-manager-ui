<script lang="ts">
import Vue from "vue";

import { teamCompetitions } from "@/router/routes";
import { Paging, SortDirection, PagingParams } from "@/helpers";
import { table } from "@/components/mixins";

import cmService from "#/competitions/service";
import { Competition } from "#/competitions/models/competition";
import { cmDetailsRoute } from "#/competitions/details/routes";

import ManageCompetitionLink from "#/competitions/components/ManageCompetitionLink.vue";

export default Vue.extend({
  name: "TeamCompetitions",

  components: { ManageCompetitionLink },

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
      const paginated = await cmService.fetchTeamCompetitions(payload);

      this.competitions = paginated.items;
      return paginated.total;
    },

    onCurrentChange(cm: Competition) {
      this.$router.push(cmDetailsRoute({ cm: cm.id }));
    }
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
