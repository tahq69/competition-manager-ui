<script lang="ts">
import { createPaging } from "crip-vue-bootstrap";
import Vue from "vue";
import { Location } from "vue-router";

import ManageTeamMemberBtn from "#/teams/components/ManageTeamMemberBtn.vue";
import CreateTeamMemberBtn from "#/teams/components/CreateTeamMemberBtn.vue";
import TeamBtn from "#/teams/components/TeamBtn.vue";
import ManageTeamBtn from "#/teams/components/ManageTeamBtn.vue";

import { TeamMember } from "../../models/team-member";
import memberService from "../service";

const { mixin, paging: members } = createPaging<TeamMember>((paging, to) => {
  return memberService.fetchTeamMembers({ paging, team_id: to.params.team });
});

export default Vue.extend({
  name: "ManageMembers",

  components: {
    ManageTeamMemberBtn,
    CreateTeamMemberBtn,
    TeamBtn,
    ManageTeamBtn
  },

  props: {
    team: { type: [String, Number], required: true }
  },

  mixins: [mixin],

  data: () => ({ members }),

  created() {
    this.log = this.$logger.component(this);
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
                     title="Edit team details">
        {{ $t('teams.manage_members_grid_head_manage_team') }}
      </ManageTeamBtn>

      <TeamBtn :team="team"
               btn="light"
               title="View team public profile">
        Team
      </TeamBtn>

      <CreateTeamMemberBtn :team="team"
                           btn="light"
                           title="Create new member in a team">
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
        <template v-for="member in members.items">
          <tr @click="members.select(member)"
              :class="members.classes(member)"
              :key="member.id">
            <td>{{ member.id }}</td>
            <td>{{ member.name }} &nbsp;
              <ManageTeamMemberBtn :team="member.team_id"
                                   :member="member.id"
                                   badge
                                   :title="$t('teams.manage_members_grid_btn_edit_title')">
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
