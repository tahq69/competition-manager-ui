<script lang="ts">
import { createPaging } from "crip-vue-bootstrap";
import Vue from "vue";
import { Location } from "vue-router";

import { Id } from "@/types";

import { manageTeamMembersRoute } from "../members/routes";
import { Team } from "../models/team";
import { createTeamRoute, manageTeamRoute } from "../routes";
import teamService from "../service";

const { mixin, paging: teams } = createPaging<Team>(paging =>
  teamService.fetchTeams({ paging })
);

export default Vue.extend({
  name: "ManageTeams",

  mixins: [mixin],

  data: () => ({ teams }),

  methods: {
    createTeamRoute: () => createTeamRoute(),
    manageTeamRoute: (team: Team) => manageTeamRoute({ team: team.id }),
    manageTeamMembersRoute: (team: Team) =>
      manageTeamMembersRoute({ team: team.id })
  },

  created() {
    this.$logger.component(this);
  }
});
</script>

<template>
  <CGrid id="manage-teams"
         :paging="teams">
    <span slot="title">{{ $t('teams.manage_teams_grid_title') }}</span>
    <CCardAction slot="actions"
                 :to="createTeamRoute()">
      {{ $t('teams.manage_teams_grid_head_create_new') }}
    </CCardAction>

    <table class="table table-hover">
      <thead>
        <tr>
          <CGridHeader :paging="teams"
                       column="id"
                       :title="$t('teams.manage_teams_grid_head_id_title')">
            {{ $t('teams.manage_teams_grid_head_id_text') }}
          </CGridHeader>

          <CGridHeader :paging="teams"
                       column="name"
                       :title="$t('teams.manage_teams_grid_head_name_title')">
            {{ $t('teams.manage_teams_grid_head_name_text') }}
          </CGridHeader>

          <CGridHeader :paging="teams"
                       column="short"
                       :title="$t('teams.manage_teams_grid_head_short_title')">
            {{ $t('teams.manage_teams_grid_head_short_text') }}
          </CGridHeader>
        </tr>
      </thead>
      <tbody>
        <template v-for="team in teams.items">
          <tr @click="teams.select(team)"
              :class="teams.classes(team)"
              :key="team.id">
            <td>{{ team.id }}</td>
            <td>
              {{ team.name }} &nbsp;
              <router-link :to="manageTeamRoute(team)"
                           class="badge badge-light actions"
                           :title="$t('teams.manage_teams_grid_btn_edit_title')">
                <i class="fa fa-pencil-square-o"></i>
                {{ $t('teams.manage_teams_grid_btn_edit_text') }}
              </router-link>
              <router-link :to="manageTeamMembersRoute(team)"
                           class="badge badge-light actions"
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
