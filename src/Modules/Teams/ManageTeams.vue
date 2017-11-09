<template>
  <grid id="manage-teams" :paging="paging">
    <span slot="title">{{ $t('teams.manage_teams_panel_title') }}</span>
    <panel-action slot="actions" :to="createRoute">
      {{ $t('teams.manage_teams_panel_head_create_new') }}
    </panel-action>

    <table class="table table-hover">
      <thead>
      <tr>
        <sortable-header
            :paging="paging"
            column="name"
            :title="$t('teams.manage_teams_panel_grid_head_name_title')"
        >
          {{ $t('teams.manage_teams_panel_grid_head_name_text') }}
        </sortable-header>
        <sortable-header
            :paging="paging"
            column="short"
            :title="$t('teams.manage_teams_panel_grid_head_short_title')"
        >
          {{ $t('teams.manage_teams_panel_grid_head_short_text') }}
        </sortable-header>
      </tr>
      </thead>
      <tbody>
      <template v-for="team in paging.items">
        <tr
            @click="paging.select(team)"
            :class="paging.rowClasses(team)"
            :key="team.id"
        >
          <td>{{ team.name }}
            &nbsp;
            <router-link
                :to="team.routes.edit"
                class="label label-info actions"
                :title="$t('teams.manage_teams_panel_grid_btn_edit_title')"
            >
              <i class="fa fa-pencil-square-o"></i>
              {{ $t('teams.manage_teams_panel_grid_btn_edit_text') }}
            </router-link>
            &nbsp;
            <router-link
                :to="team.routes.manageMembers"
                class="label label-info actions"
                :title="$t('teams.manage_teams_panel_grid_btn_members_title')"
            >
              {{ $t('teams.manage_teams_panel_grid_btn_members_text') }}
            </router-link>
          </td>
          <td>{{ team.short }}</td>
        </tr>
      </template>
      </tbody>
    </table>
  </grid>
</template>

<script lang="ts">
import Grid from "@/Components/Grid/Grid.vue"
import PanelAction from "@/Components/Panel/PanelAction.vue"
import SortableHeader from "@/Components/Grid/SortableHeader.vue"

import store from "@/Store"
import Paging from "@/Components/Grid/Paging"
import { createTeam, manageTeams } from "@/Router/Routes"

import { IFetchTeams } from "./Store/Contracts"
import Team from "./Team"

export default {
  name: "ManageTeams",

  components: { Grid, PanelAction, SortableHeader },

  data() {
    return {
      paging: new Paging<Team>(this, { route: manageTeams }),
      createRoute: createTeam,
    }
  },

  created() {
    this.$logger.component(this)
    this.paging.init(() => this.fetchPage())
  },

  methods: {
    async fetchPage() {
      this.paging.startLoading()
      const pagination = await store.dispatch<IFetchTeams>({
        type: "fetchTeams",
        paging: this.paging,
      })

      this.paging.update(pagination)
    },
  },
}
</script>
