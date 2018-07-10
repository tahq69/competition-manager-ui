<script lang="ts">
import Vue from "vue";

import { Paging, SortDirection } from "@/helpers";
import { manageTeamMembers } from "@/router/routes";

import { TeamMember } from "#/teams/models/team-member";
import { fetchTeamMembers } from "#/teams/members/service";

import ManageTeamMemberBtn from "#/teams/components/ManageTeamMemberBtn.vue";
import CreateTeamMemberBtn from "#/teams/components/CreateTeamMemberBtn.vue";
import TeamBtn from "#/teams/components/TeamBtn.vue";
import ManageTeamBtn from "#/teams/components/ManageTeamBtn.vue";

export default Vue.extend({
  name: "ManageMembers",

  components: {
    ManageTeamMemberBtn,
    CreateTeamMemberBtn,
    TeamBtn,
    ManageTeamBtn
  },

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
    members: [] as TeamMember[]
  }),

  computed: {
    currentPage(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.page.toString()) || 1;
    },

    currentPageSize(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.pageSize.toString()) || 10;
    }
  },

  methods: {
    currentChange(page: string) {
      const pageSize = this.pageSize.toString();

      // trigger route change when users updates pagination.
      this.$router.push({
        name: manageTeamMembers.name,
        params: { page, sort: this.sort, direction: this.direction, pageSize }
      });
    },

    async fetchPage() {
      this.loading = true;

      const page = this.currentPage;
      const pageSize = this.currentPageSize;
      const direction = this.direction as SortDirection;
      const paging = new Paging(page, pageSize, this.sort, direction);
      const payload = { paging, team_id: this.team };
      const paginated = await fetchTeamMembers(payload);

      this.members = paginated.items;
      this.totalItems = paginated.total;

      this.loading = false;
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
  <CGrid id="manage-members"
         :paging="members">
    <span slot="title">{{ $t('teams.manage_members_grid_title') }}</span>

    <span slot="actions">
      <ManageTeamBtn :team="team"
                     btn="light"
                     title="Edit team details"
                     arrow="left"
                     icon>
        {{ $t('teams.manage_members_grid_head_manage_team') }}
      </ManageTeamBtn>

      <TeamBtn :team="team"
               btn="light"
               title="View team public profile"
               arrow="left"
               icon>
        Team
      </TeamBtn>

      <CreateTeamMemberBtn :team="team"
                           btn="light"
                           title="Create new member in a team"
                           icon>
        {{ $t('teams.manage_members_grid_head_create_member') }}
      </CreateTeamMemberBtn>
    </span>

    <table class="table table-hover">
      <thead>
        <tr>
          <CGridHeader :paging="members"
                       column="id"
                       :title="$t('teams.manage_members_grid_head_id_title')">
            {{ $t('teams.manage_members_grid_head_id_text') }}
          </CGridHeader>

          <CGridHeader :paging="members"
                       column="name"
                       :title="$t('teams.manage_members_grid_head_name_title')">
            {{ $t('teams.manage_members_grid_head_name_text') }}
          </CGridHeader>

          <CGridHeader :paging="members"
                       column="membership_type"
                       :title="$t('teams.manage_members_grid_head_membership_type_title')">
            {{ $t('teams.manage_members_grid_head_membership_type_text') }}
          </CGridHeader>
        </tr>
      </thead>
      <tbody>
        <template v-for="member in members">
          <tr @click="members.select(member)"
              :class="members.classes(member)"
              :key="member.id">
            <td>{{ member.id }}</td>
            <td>{{ member.name }} &nbsp;
              <ManageTeamMemberBtn :team="member.team_id"
                                   :member="member.id"
                                   :title="$t('teams.manage_members_grid_btn_edit_title')"
                                   badge
                                   icon>
                {{ $t('teams.manage_members_grid_btn_edit_text') }}
              </ManageTeamMemberBtn>
            </td>
            <td>{{ member.membership_type }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </CGrid>
</template>
