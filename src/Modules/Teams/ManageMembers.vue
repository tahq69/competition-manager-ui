<script lang="ts">
import { Paging } from "crip-vue-bootstrap"
import Vue from "vue"
import { Location } from "vue-router"

import { createTeamMember, manageTeam, manageTeamMembers } from "@/Router/Routes"

import teamService from "./Service"
import Team from "./Team"
import TeamMember from "./TeamMember"

export default Vue.extend({
  name: "ManageMembers",

  data() {
    const vm = this
    return {
      paging: new Paging<TeamMember>({ vm, route: manageTeamMembers }),
    }
  },

  created() {
    this.$logger.component(this)
    this.paging.init(this.fetchPage)
  },

  computed: {
    teamId(): number {
      return parseInt(this.$route.params.team, 10)
    },

    manageTeamRoute(): Location {
      return { ...manageTeam, params: { id: this.teamId.toString() } }
    },

    createTeamMemberRoute(): Location {
      return { ...createTeamMember, params: { id: this.teamId.toString() } }
    },
  },

  methods: {
    async fetchPage() {
      const pagination = await teamService.fetchTeamMembers({
        paging: this.paging,
        team_id: this.teamId,
      })

      this.paging.update(pagination)
    },
  },
})
</script>

<template>
  <CGrid id="manage-members"
         :paging="paging">
    <span slot="title">{{ $t('teams.manage_members_grid_title') }}</span>

    <span slot="actions">
      <CPanelAction :to="manageTeamRoute">
        {{ $t('teams.manage_members_grid_head_manage_team') }}
      </CPanelAction>

      <CPanelAction :to="createTeamMemberRoute">
        {{ $t('teams.manage_members_grid_head_create_member') }}
      </CPanelAction>
    </span>

    <table class="table table-hover">
      <thead>
        <tr>
          <CGridHeader :paging="paging"
                       column="id"
                       :title="$t('teams.manage_members_grid_head_id_title')">
            {{ $t('teams.manage_members_grid_head_id_text') }}
          </CGridHeader>

          <CGridHeader :paging="paging"
                       column="name"
                       :title="$t('teams.manage_members_grid_head_name_title')">
            {{ $t('teams.manage_members_grid_head_name_text') }}
          </CGridHeader>
        </tr>
      </thead>
      <tbody>
        <template v-for="member in paging.items">
          <tr @click="paging.select(member)"
              :class="paging.classes(member)"
              :key="member.id">
            <td>{{ member.id }}</td>
            <td>{{ member.name }} &nbsp;
              <router-link :to="member.routes.edit"
                           class="label label-info actions"
                           :title="$t('teams.manage_members_grid_btn_edit_title')">
                <i class="fa fa-pencil-square-o"></i>
                {{ $t('teams.manage_members_grid_btn_edit_text') }}
              </router-link>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </CGrid>
</template>
