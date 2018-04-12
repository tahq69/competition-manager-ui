<script lang="ts">
import Vue from "vue";

import { Next } from "@/typings";

import TeamCompetitionsBtn from "#/teams/components/TeamCompetitionsBtn.vue";
import TeamBtn from "#/teams/components/TeamBtn.vue";
import ManageTeamBtn from "#/teams/components/ManageTeamBtn.vue";

import { TeamAuth } from "../auth";
import { Team } from "../models/team";
import teamService from "../service";

export default Vue.extend({
  name: "Team",

  components: { TeamCompetitionsBtn, TeamBtn, ManageTeamBtn },

  props: {
    team: { type: [Number, String], required: true }
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { id: to.params.team };
    teamService.fetchTeam(payload).then(team => next(vm => vm.setTeam(team)));
  },

  data: () => ({ details: new Team({}), canEdit: false }),

  methods: {
    async setTeam(team: Team) {
      this.details = team;
      this.canEdit = await TeamAuth.canEdit({ team: team.id });
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
        <div v-if="canEdit"
             class="card-footer">
          <ManageTeamBtn :team="details.id"
                         btn="primary"
                         icon="fas fa-edit">
            Edit
          </ManageTeamBtn>
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
                                   class="nav-link" />
            </li>
          </ul>
        </div>
        <!-- /.card-header -->

        <router-view></router-view>
      </div>
    </CCol>
  </CRow>
</template>
