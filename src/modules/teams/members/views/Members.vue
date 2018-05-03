<script lang="ts">
import { createPaging } from "crip-vue-bootstrap";
import Vue from "vue";

import ManageTeamMemberBtn from "#/teams/components/ManageTeamMemberBtn.vue";
import ProfileBtn from "#/user/components/ProfileBtn.vue";

import { TeamMember } from "../../models/team-member";
import { TeamMemberAuth } from "../auth";
import membersService from "../service";

const { mixin, paging: members } = createPaging<TeamMember>((paging, to) => {
  return membersService.fetchTeamMembers({ paging, team_id: to.params.team });
});

export default Vue.extend({
  name: "TeamMembers",

  components: { ManageTeamMemberBtn, ProfileBtn },

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
