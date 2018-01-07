<script lang="ts">
import { Paging } from "crip-vue-bootstrap"
import Vue from "vue"
import { Location } from "vue-router"

import { createTeam, manageTeams } from "@/Router/Routes"

import teamService from "./Service"
import Team from "./Team"

export default Vue.extend({
  name: "ManageTeams",

  data() {
    const vm = this
    return {
      createRoute: createTeam,
      paging: new Paging<Team>({ vm, route: manageTeams }),
    }
  },

  created() {
    this.$logger.component(this)
    this.paging.init(() => this.fetchPage())
  },

  methods: {
    async fetchPage() {
      const pagination = await teamService.fetchTeams({
        paging: this.paging,
      })

      this.paging.update(pagination)
    },
  },
})
</script>

<template>
  <CGrid id="manage-teams"
         :paging="paging">
    <span slot="title">{{ $t('teams.manage_teams_grid_title') }}</span>
    <CPanelAction slot="actions"
                  :to="createRoute">
      {{ $t('teams.manage_teams_grid_head_create_new') }}
    </CPanelAction>

    <table class="table table-hover">
      <thead>
        <tr>
          <CGridHeader :paging="paging"
                       column="id"
                       :title="$t('teams.manage_teams_grid_head_id_title')">
            {{ $t('teams.manage_teams_grid_head_id_text') }}
          </CGridHeader>

          <CGridHeader :paging="paging"
                       column="name"
                       :title="$t('teams.manage_teams_grid_head_name_title')">
            {{ $t('teams.manage_teams_grid_head_name_text') }}
          </CGridHeader>

          <CGridHeader :paging="paging"
                       column="short"
                       :title="$t('teams.manage_teams_grid_head_short_title')">
            {{ $t('teams.manage_teams_grid_head_short_text') }}
          </CGridHeader>
        </tr>
      </thead>
      <tbody>
        <template v-for="team in paging.items">
          <tr @click="paging.select(team)"
              :class="paging.classes(team)"
              :key="team.id">
            <td>{{ team.id }}</td>
            <td>{{ team.name }} &nbsp;
              <router-link :to="team.routes.edit"
                           class="label label-info actions"
                           :title="$t('teams.manage_teams_grid_btn_edit_title')">
                <i class="fa fa-pencil-square-o"></i>
                {{ $t('teams.manage_teams_grid_btn_edit_text') }}
              </router-link>
              &nbsp;
              <router-link :to="team.routes.manageMembers"
                           class="label label-info actions"
                           :title="$t('teams.manage_teams_grid_btn_members_title')">
                {{ $t('teams.manage_teams_grid_btn_members_text') }}
              </router-link>
            </td>
            <td>{{ team.short }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </CGrid>
</template>
