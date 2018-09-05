<script lang="ts">
import Vue from "vue";

import { SortDirection, PagingParams } from "@/typings";
import { Paging } from "@/helpers";
import { table } from "@/components/mixins";
import { teamMembers } from "@/router/routes";

import { TeamMember } from "#/teams/models/team-member";

import { TeamMemberAuth } from "#/teams/members/auth";
import { fetchTeamMembers } from "#/teams/members/service";

export default Vue.extend({
  name: "TeamMembers",

  mixins: [table],

  props: {
    team: { type: [String, Number], required: true }
  },

  data: () => ({
    members: [] as TeamMember[],
    canEdit: false,
    canEditMembers: false,
    route: teamMembers // make sure table mixin knows current route
  }),

  methods: {
    hasProfile(member: TeamMember) {
      return (member.user_id || 0) > 0;
    },

    async fetchPage(paging: Paging) {
      const payload = { paging, team_id: this.team };
      const paginated = await fetchTeamMembers(payload);

      this.members = paginated.items;

      return paginated.total;
    }
  },

  created() {
    TeamMemberAuth.canEdit({ team: this.team }).then(
      canEdit => (this.canEdit = canEdit)
    );

    TeamMemberAuth.canEditMembers({ team: this.team }).then(
      canEdit => (this.canEditMembers = canEdit)
    );
  }
});
</script>

<template>
  <div id="team-members"
       v-loading="loading">
    <el-table :data="members"
              :default-sort="defaultSort"
              @sort-change="onSortChange">
      <el-table-column prop="name"
                       label="Name"
                       sortable="custom"></el-table-column>
      <el-table-column prop="membership_type"
                       label="Membership"
                       sortable="custom"></el-table-column>
      <el-table-column>
        <template slot-scope="member">
          <ManageTeamMemberLink :team="member.row.team_id"
                                :member="member.row.id"
                                icon="edit"
                                type="primary"
                                button
                                circle
                                mini/>

          <ProfileLink v-if="hasProfile(member.row)"
                       :user="member.row.user_id"
                       button
                       mini>
            Profile
          </ProfileLink>
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
