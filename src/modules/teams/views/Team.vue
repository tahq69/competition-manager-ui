<script lang="ts">
import Vue from "vue";

import { Next } from "@/typings";

import CreateCompetitionBtn from "#/teams/components/CreateCompetitionBtn.vue";
import ManageTeamBtn from "#/teams/components/ManageTeamBtn.vue";
import TeamBtn from "#/teams/components/TeamBtn.vue";
import TeamCompetitionsBtn from "#/teams/components/TeamCompetitionsBtn.vue";

import { TeamAuth } from "../auth";
import { Team } from "../models/team";
import teamService from "../service";

export default Vue.extend({
  name: "Team",

  components: {
    CreateCompetitionBtn,
    ManageTeamBtn,
    TeamBtn,
    TeamCompetitionsBtn
  },

  props: {
    team: { type: [Number, String], required: true }
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { id: to.params.team };
    teamService.fetchTeam(payload).then(team => next(vm => vm.setTeam(team)));
  },

  data: () => ({
    details: new Team({}),
    canEdit: false,
    canCreateCompetition: false
  }),

  methods: {
    async setTeam(team: Team) {
      this.details = team;
      this.canEdit = await TeamAuth.canEdit({ team: team.id });
      this.canCreateCompetition = await TeamAuth.canCreateCompetition(team.id);
    }
  },

  mounted() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <CRow id="team">
    <CCol :sm="6"
          :md="4"
          :lg="3">
      <div class="card">
        <img class="card-img-top img-fluid"
             :src="details.logo"
             alt="Team logo">

        <div class="card-body">
          <h5 class="card-title">{{ details.name }}</h5>
          <p class="card-subtitle mb-2 text-muted">{{ details.short }}</p>
        </div>

        <div v-if="canEdit || canCreateCompetition"
             class="card-footer">
          <ManageTeamBtn :team="details.id"
                         btn="primary"
                         title="Manage team details"
                         icon>
            Edit
          </ManageTeamBtn>
          &nbsp;
          <CreateCompetitionBtn :team="details.id"
                                btn="primary"
                                title="Create new competition"
                                icon>
            Competition
          </CreateCompetitionBtn>
        </div>
      </div>
    </CCol>

    <CCol :sm="6"
          :md="8"
          :lg="9">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <TeamBtn :team="team"
                       :exact="false"
                       class="nav-link">
                Members
              </TeamBtn>
            </li>

            <li class="nav-item">
              <TeamCompetitionsBtn :team="team"
                                   :exact="false"
                                   class="nav-link">
                Competitions
              </TeamCompetitionsBtn>
            </li>
          </ul>
        </div>
        <!-- /.card-header -->

        <router-view></router-view>
      </div>
    </CCol>
  </CRow>
</template>
