<template>
  <grid id="manage-teams" :paging="paging">
    <span slot="title">Manage teams</span>
    <panel-action slot="actions" :to="createRoute">
      Create New Team
    </panel-action>

    <table class="table table-hover">
      <thead>
      <tr>
        <th>Name</th>
        <th>Short</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="team in paging.items">
        <tr @click="paging.select(team)" :class="paging.rowClasses(team)" :key="team.id">
          <td>{{ team.name }}&nbsp;
            <router-link :to="team.routes.edit" class="label label-info actions">
              Edit
            </router-link>
            &nbsp;
            <router-link
                :to="team.routes.manageMembers" class="label label-info actions">
              Members
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

import store from "@/Store"
import Paging from "@/Components/Grid/Paging"
import { createTeam, manageTeams } from "@/Router/Routes"

import { IFetchTeams } from "./Store/Contracts"
import Team from "./Team"

export default {
  name: "ManageTeams",

  components: { Grid, PanelAction },

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
