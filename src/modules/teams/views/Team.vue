<script lang="ts">
import Vue from "vue"

import { Next } from "@/types"

import { TeamAuth } from "../auth"
import { Team } from "../models/team"
import teamService from "../service"

import TeamCompetitionsLink from "../links/TeamCompetitionsLink.vue"
import TeamLink from "../links/TeamLink.vue"

import { manageTeamRoute } from "../routes"

export default Vue.extend({
  name: "Team",

  components: { TeamCompetitionsLink, TeamLink },

  props: {
    team: { type: [Number, String], required: true },
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { id: to.params.team }
    teamService.fetchTeam(payload).then(team => next(vm => vm.setTeam(team)))
  },

  data: () => ({ details: new Team({}), canEdit: false }),

  methods: {
    async setTeam(team: Team) {
      this.details = team
      this.canEdit = await TeamAuth.canEdit({ team: team.id })
    },

    manageTeamRoute: (team: Team) => manageTeamRoute({ team: team.id }),
  },

  mounted() {
    this.log = this.$logger.component(this)
  },
})
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
          <router-link :to="manageTeamRoute(details)"
                       class="btn btn-primary">
            <i class="fa fa-pencil-square-o"></i>
            <span>Edit</span>
          </router-link>
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
              <TeamLink :team="team"
                        class="nav-link" />
            </li>

            <li class="nav-item">
              <TeamCompetitionsLink :team="team"
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
