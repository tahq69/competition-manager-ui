<script lang="ts">
import { createPaging } from "crip-vue-bootstrap"
import Vue from "vue"
import { Location } from "vue-router"

import { createTeamMember, manageTeam } from "@/router/routes"

import { TeamMember } from "../../team-member"
import memberService from "../service"

const { mixin, paging: members } = createPaging<TeamMember>((paging, to) => {
  return memberService.fetchTeamMembers({ paging, team_id: to.params.team })
})

export default Vue.extend({
  name: "ManageMembers",

  props: {
    team: { type: [String, Number], required: true },
  },

  mixins: [mixin],

  data: () => ({ members }),

  computed: {
    teamId(): string {
      return this.team.toString()
    },

    manageTeamRoute(): Location {
      return { ...manageTeam, params: { team: this.teamId } }
    },

    createTeamMemberRoute(): Location {
      return { ...createTeamMember, params: { team: this.teamId } }
    },
  },

  created() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <CGrid id="manage-members"
         :paging="members">
    <span slot="title">{{ $t('teams.manage_members_grid_title') }}</span>

    <span slot="actions">
      <CCardAction :to="manageTeamRoute">
        {{ $t('teams.manage_members_grid_head_manage_team') }}
      </CCardAction>

      <CCardAction :to="createTeamMemberRoute">
        {{ $t('teams.manage_members_grid_head_create_member') }}
      </CCardAction>
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
              <router-link :to="member.routes.edit"
                           class="badge badge-light actions"
                           :title="$t('teams.manage_members_grid_btn_edit_title')">
                <i class="fa fa-pencil-square-o"></i>
                {{ $t('teams.manage_members_grid_btn_edit_text') }}
              </router-link>
            </td>
            <td>{{ member.membership_type }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </CGrid>
</template>
