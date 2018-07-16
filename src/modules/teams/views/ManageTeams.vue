<script lang="ts">
import Vue from "vue";

import { Paging } from "@/helpers";
import { manageTeams } from "@/router/routes";
import { table } from "@/components/mixins";

import { Team } from "#/teams/models/team";
import { fetchTeams } from "#/teams/service";

import CreateTeamLink from "#/teams/components/CreateTeamLink.vue";
import ManageTeamLink from "#/teams/components/ManageTeamLink.vue";
import ManageTeamMembersLink from "#/teams/components/ManageTeamMembersLink.vue";

export default Vue.extend({
  name: "ManageTeams",

  components: { CreateTeamLink, ManageTeamLink, ManageTeamMembersLink },

  mixins: [table],

  data: () => ({ teams: [] as Team[] }),

  methods: {
    async fetchPage(paging: Paging) {
      const paginated = await fetchTeams({ paging });

      this.teams = paginated.items;

      return paginated.total;
    }
  }
});
</script>

<template>
  <el-card id="manage-teams">
    <div slot="header"
         class="clearfix">
      <span>{{ $t('teams.manage_teams_grid_title') }}</span>
      <CreateTeamLink icon="plus"
                      button
                      mini>
        {{ $t('teams.manage_teams_grid_head_create_new') }}
      </CreateTeamLink>
    </div>
    <div v-loading="loading">
      <el-table :data="teams"
                :default-sort="defaultSort"
                @sort-change="onSortChange">
        <el-table-column prop="id"
                         :label="$t('teams.manage_teams_grid_head_id')"
                         sortable="custom">
        </el-table-column>
        <el-table-column prop="name"
                         :label="$t('teams.manage_teams_grid_head_name')"
                         sortable="custom">
        </el-table-column>
        <el-table-column prop="short"
                         :label="$t('teams.manage_teams_grid_head_short')"
                         sortable="custom">
        </el-table-column>
        <el-table-column>
          <template slot-scope="team">
            <ManageTeamLink :team="team.row.id"
                            :title="$t('teams.manage_teams_grid_btn_edit_title')"
                            type="primary"
                            icon="edit"
                            button
                            circle
                            mini/>
            <ManageTeamMembersLink :team="team.row.id"
                                   :title="$t('teams.manage_teams_grid_btn_members_title')"
                                   button
                                   mini>
              {{ $t('teams.manage_teams_grid_btn_members_text') }}
            </ManageTeamMembersLink>
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
