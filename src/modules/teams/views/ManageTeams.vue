<script lang="ts">
import { createPaging } from "crip-vue-bootstrap";
import Vue from "vue";
import { Location } from "vue-router";

import { Id } from "@/typings";

import CreateTeamBtn from "#/teams/components/CreateTeamBtn.vue";
import ManageTeamBtn from "#/teams/components/ManageTeamBtn.vue";
import ManageTeamMembersBtn from "#/teams/components/ManageTeamMembersBtn.vue";

import { manageTeamMembersRoute } from "../members/routes";
import { Team } from "../models/team";
import teamService from "../service";

const { mixin, paging: teams } = createPaging<Team>(paging =>
  teamService.fetchTeams({ paging })
);

export default Vue.extend({
  name: "ManageTeams",

  components: { CreateTeamBtn, ManageTeamBtn, ManageTeamMembersBtn },

  mixins: [mixin],

  data: () => ({ teams }),

  methods: {
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

    <span slot="actions">
      <CreateTeamBtn btn="light">
        {{ $t('teams.manage_teams_grid_head_create_new') }}
      </CreateTeamBtn>
    </span>

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
              {{ team.name }}&nbsp;
              <ManageTeamBtn :team="team.id"
                             :title="$t('teams.manage_teams_grid_btn_edit_title')"
                             badge>
                {{ $t('teams.manage_teams_grid_btn_edit_text') }}
              </ManageTeamBtn>&nbsp;

              <ManageTeamMembersBtn :team="team.id"
                                    :title="$t('teams.manage_teams_grid_btn_members_title')"
                                    badge>
                {{ $t('teams.manage_teams_grid_btn_members_text') }}
              </ManageTeamMembersBtn>
            </td>
            <td>{{ team.short }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </CGrid>
</template>
