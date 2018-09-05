<script lang="ts">
import Vue from "vue";

import { Paging } from "@/helpers";
import { manageTeamMembers } from "@/router/routes";
import { table } from "@/components/mixins";

import { TeamMember } from "#/teams/models/team-member";
import { fetchTeamMembers } from "#/teams/members/service";

export default Vue.extend({
  name: "ManageMembers",

  mixins: [table],

  props: {
    team: { type: [String, Number], required: true }
  },

  data: () => ({ members: [] as TeamMember[] }),

  methods: {
    async fetchPage(paging: Paging) {
      const payload = { paging, team_id: this.team };
      const paginated = await fetchTeamMembers(payload);

      this.members = paginated.items;

      return paginated.total;
    }
  }
});
</script>

<template>
  <el-card id="manage-team-members">
    <div slot="header"
         class="clearfix">
      <span>{{ $t('teams.manage_members_grid_title') }}</span>
      <ManageTeamLink icon="edit"
                      :team="team"
                      button
                      mini>
        {{ $t('teams.manage_members_grid_head_manage_team') }}
      </ManageTeamLink>
      <TeamLink icon="view"
                :team="team"
                button
                mini>
        Team
      </TeamLink>
      <CreateTeamMemberLink icon="plus"
                            :team="team"
                            button
                            mini>
        {{ $t('teams.manage_members_grid_head_create_member') }}
      </CreateTeamMemberLink>
    </div>
    <div v-loading="loading">
      <el-table :data="members"
                :default-sort="defaultSort"
                @sort-change="onSortChange">
        <el-table-column prop="id"
                         :label="$t('teams.manage_members_grid_head_id')"
                         sortable="custom">
        </el-table-column>
        <el-table-column prop="name"
                         :label="$t('teams.manage_members_grid_head_name')"
                         sortable="custom">
        </el-table-column>
        <el-table-column prop="membership_type"
                         :label="$t('teams.manage_members_grid_head_membership_type')"
                         sortable="custom">
        </el-table-column>
        <el-table-column>
          <template slot-scope="member">
            <ManageTeamMemberLink :team="member.row.team_id"
                                  :member="member.row.id"
                                  type="primary"
                                  icon="edit"
                                  button
                                  circle
                                  mini>
            </ManageTeamMemberLink>
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
