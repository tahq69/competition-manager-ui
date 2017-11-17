<template>
  <grid id="manage-members" :paging="paging">
    <span slot="title">{{ $t('teams.manage_members_grid_title') }}</span>

    <span slot="actions">
      <panel-action :to="manageTeamRoute">
        {{ $t('teams.manage_members_grid_head_manage_team') }}
      </panel-action>

      <panel-action :to="createTeamMemberRoute">
        {{ $t('teams.manage_members_grid_head_create_member') }}
      </panel-action>
    </span>

    <table class="table table-hover">
      <thead>
      <tr>
        <sortable-header
            :paging="paging"
            column="id"
            :title="$t('teams.manage_members_grid_head_id_title')"
        >
          {{ $t('teams.manage_members_grid_head_id_text') }}
        </sortable-header>

        <sortable-header
            :paging="paging"
            column="name"
            :title="$t('teams.manage_members_grid_head_name_title')"
        >
          {{ $t('teams.manage_members_grid_head_name_text') }}
        </sortable-header>
      </tr>
      </thead>
      <tbody>
      <template v-for="member in paging.items">
        <tr
            @click="paging.select(member)"
            :class="paging.rowClasses(member)"
            :key="member.id"
        >
          <td>{{ member.id }}</td>
          <td>{{ member.name }}
            &nbsp;
            <router-link
                :to="member.routes.edit"
                class="label label-info actions"
                :title="$t('teams.manage_members_grid_btn_edit_title')"
            >
              <i class="fa fa-pencil-square-o"></i>
              {{ $t('teams.manage_members_grid_btn_edit_text') }}
            </router-link>
          </td>
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
import {
  createTeamMember,
  manageTeam,
  manageTeamMembers,
} from "@/Router/Routes"

import { IFetchTeamMembers } from "./Store/Contracts"
import Team from "./Team"
import TeamMember from "./TeamMember"

export default {
  name: "ManageMembers",

  components: { Grid, PanelAction, SortableHeader },

  data() {
    return {
      paging: new Paging<TeamMember>(this, { route: manageTeamMembers }),
    }
  },

  created() {
    this.$logger.component(this)
    this.paging.init(this.fetchPage)
  },

  computed: {
    teamId() {
      return this.$route.params.team
    },

    manageTeamRoute() {
      return { ...manageTeam, params: { id: this.teamId } }
    },

    createTeamMemberRoute() {
      return { ...createTeamMember, params: { id: this.teamId } }
    },
  },

  methods: {
    async fetchPage() {
      this.paging.startLoading()
      const pagination = await store.dispatch<IFetchTeamMembers>({
        type: "fetchTeamMembers",
        teamId: this.teamId,
        paging: this.paging,
      })

      this.paging.update(pagination)
    },
  },
}
</script>
