<script lang="ts">
import Vue from "vue";

import { ElSortDirection, SortDirection, PagingParams } from "@/typings";
import { teamMembers } from "@/router/routes";
import { Paging } from "@/helpers";

import { TeamMember } from "#/teams/models/team-member";

import { TeamMemberAuth } from "#/teams/members/auth";
import membersService from "#/teams/members/service";

import ManageTeamMemberLink from "#/teams/components/ManageTeamMemberLink.vue";
import ProfileLink from "#/user/components/ProfileLink.vue";

export default Vue.extend({
  name: "TeamMembers",

  components: { ManageTeamMemberLink, ProfileLink },

  props: {
    team: { type: [String, Number], required: true },
    page: { type: [String, Number], required: true },
    perPage: { type: [String, Number], required: true },
    sort: { type: String, required: true },
    direction: { type: String, required: true }
  },

  data: () => ({
    loading: false,
    totalItems: 1000000,
    members: [] as TeamMember[],
    canEdit: false,
    canEditMembers: false
  }),

  computed: {
    hasMembers(): boolean {
      return this.members.length > 0;
    },

    currentPage(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.page.toString()) || 1;
    },

    currentPageSize(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.perPage.toString()) || 10;
    },

    defaultSort(): any {
      return {
        prop: this.sort,
        order: this.direction == "asc" ? "ascending" : "descending"
      };
    }
  },

  methods: {
    hasProfile(member: TeamMember) {
      return (member.user_id || 0) > 0;
    },

    onDataChange({
      page = "1",
      direction = "asc",
      sort = "id",
      perPage = "10"
    }: PagingParams) {
      this.$router.push({
        name: teamMembers.name,
        params: {
          page: page.toString(),
          perPage: perPage.toString(),
          sort,
          direction
        }
      });
    },

    onPageChange(page: string) {
      // trigger route change when users updates pagination.
      this.onDataChange({
        page,
        perPage: this.perPage,
        direction: this.direction as any,
        sort: this.sort
      });
    },

    onPageSizeChange(perPage: string) {
      // trigger route change when users updates pagination.
      this.onDataChange({
        page: 1,
        perPage,
        direction: this.direction as any,
        sort: this.sort
      });
    },

    onSortChange({ order, prop }: { order: ElSortDirection; prop: string }) {
      const direction: SortDirection = order == "ascending" ? "asc" : "desc";
      // trigger route change when users updates sorting properties.
      this.onDataChange({
        page: 1,
        perPage: this.perPage,
        direction,
        sort: prop
      });
    },

    async fetchPage() {
      this.loading = true;

      const page = this.currentPage;
      const perPage = this.currentPageSize;
      const direction = this.direction as SortDirection;
      const paging = new Paging(page, perPage, this.sort, direction);
      const payload = { paging, team_id: this.team };
      const paginated = await membersService.fetchTeamMembers(payload);

      this.members = paginated.items;
      this.totalItems = paginated.total;

      this.loading = false;
    }
  },

  created() {
    this.log = this.$logger.component(this);

    // fetch data on component initial load.
    this.fetchPage();

    // update when page/perPage/sort/direction is changed.
    this.$watch(
      () => [this.page, this.sort, this.direction, this.perPage].join(),
      () => this.fetchPage()
    );

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
                       sortable="custom"
                       title="Sort by name">
      </el-table-column>
      <el-table-column prop="membership_type"
                       label="Membership"
                       sortable="custom"
                       title="Sort by membership">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <ManageTeamMemberLink :team="scope.row.team_id"
                                :member="scope.row.id"
                                title="Edit team member details"
                                icon="el-icon-edit"
                                type="primary"
                                button
                                circle
                                mini/>

          <ProfileLink v-if="hasProfile(scope.row)"
                       :user="scope.row.user_id"
                       title="Member user profile"
                       button
                       mini>
            Profile</ProfileLink>
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
