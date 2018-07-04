<script lang="ts">
import Vue from "vue";

import { teamMembers } from "@/router/routes";

import { TeamMember } from "#/teams/models/team-member";

import { TeamMemberAuth } from "#/teams/members/auth";
import membersService from "#/teams/members/service";

import ManageTeamMemberBtn from "#/teams/components/ManageTeamMemberBtn.vue";
import ProfileBtn from "#/user/components/ProfileBtn.vue";
import { Paging, SortDirection } from "@/helpers";

export default Vue.extend({
  name: "TeamMembers",

  components: { ManageTeamMemberBtn, ProfileBtn },

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

    currentPerPage(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.perPage.toString()) || 10;
    }
  },

  methods: {
    hasProfile(member: TeamMember) {
      return (member.user_id || 0) > 0;
    },

    currentChange(page: string) {
      const perPage = this.perPage.toString();

      // trigger route change when users updates pagination.
      this.$router.push({
        name: teamMembers.name,
        params: { page, sort: this.sort, direction: this.direction, perPage }
      });
    },

    async fetchPage() {
      this.loading = true;

      const page = this.currentPage;
      const perPage = this.currentPerPage;
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
  <div id="team-members">
    <table v-if="hasMembers"
           class="table mb-0 table-hover">
      <thead>
        <tr>
          <CGridHeader :paging="members"
                       column="name"
                       title="Sort by name">
            Name
          </CGridHeader>

          <CGridHeader :paging="members"
                       column="membership_type"
                       title="Sort by membership">
            Membership
          </CGridHeader>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members"
            :key="member.id"
            class="crip-table-row">
          <td>
            {{ member.name }} &nbsp;

            <ManageTeamMemberBtn :team="member.team_id"
                                 :member="member.id"
                                 badge
                                 icon>
              Edit
            </ManageTeamMemberBtn>&nbsp;

            <ProfileBtn v-if="hasProfile(member)"
                        :user="member.user_id"
                        title="Member user profile"
                        badge
                        icon>
              Profile
            </ProfileBtn>
          </td>
          <td>{{ member.membership_type }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else
         class="card-body text-danger">
      This team does not have any member.
    </div>

    <div v-if="hasMembers"
         class="card-footer clearfix">
      <CPagination :paging="members"
                   class="float-left mb-0" />
      <CPerPage :paging="members"
                class="float-right" />
    </div>
  </div>
</template>
