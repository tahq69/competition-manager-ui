<script lang="ts">
import { createPaging } from "crip-vue-bootstrap";
import Vue from "vue";

import { userProfileRoute } from "@/modules/user/routes";

import ManageTeamMemberBtn from "#/teams/components/ManageTeamMemberBtn.vue";

import { TeamMember } from "../../models/team-member";
import { TeamMemberAuth } from "../auth";
import membersService from "../service";

const { mixin, paging: members } = createPaging<TeamMember>((paging, to) => {
  return membersService.fetchTeamMembers({ paging, team_id: to.params.team });
});

export default Vue.extend({
  name: "TeamMembers",

  components: { ManageTeamMemberBtn },

  props: {
    team: { type: [String, Number], required: true }
  },

  mixins: [mixin],

  data: () => ({ members, canEdit: false, canEditMembers: false }),

  computed: {
    hasMembers(): boolean {
      return this.members.items.length > 0;
    }
  },

  methods: {
    hasProfile(member: TeamMember) {
      return (member.user_id || 0) > 0;
    },

    userProfileRoute(member: TeamMember) {
      return userProfileRoute({ user: member.user_id || 0 });
    }
  },

  created() {
    this.log = this.$logger.component(this);

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
    <div class="card-body py-0">
      <CRow>
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
            <tr v-for="member in members.items"
                :key="member.id"
                class="crip-table-row">
              <td>
                {{ member.name }} &nbsp;

                <ManageTeamMemberBtn :team="member.team_id"
                                     :member="member.id"
                                     badge />&nbsp;

                <router-link :to="userProfileRoute(member)"
                             v-if="hasProfile(member)"
                             class="badge badge-light actions"
                             title="Member profile">
                  <span>Profile</span>
                </router-link>
              </td>
              <td>{{ member.membership_type }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else
             class="py-3 py-3 col text-danger">
          This team does not have any member.
        </div>
      </CRow>
    </div>

    <div v-if="hasMembers"
         class="card-footer">
      <CRow>
        <CCol class="clearfix">
          <CPagination :paging="members"
                       class="float-left mb-0"></CPagination>
          <CPerPage :paging="members"
                    class="float-right"></CPerPage>
        </CCol>
      </CRow>
    </div>
  </div>
</template>
