<script lang="ts">
import Vue from "vue"

import { Next } from "@/types"

import teamService from "../service"
import { Team } from "../team"

import TeamCompetitionsLink from "../links/TeamCompetitionsLink.vue"
import TeamLink from "../links/TeamLink.vue"

export default Vue.extend({
  name: "Team",

  components: {
    TeamCompetitionsLink,
    TeamLink,
  },

  props: {
    team: { type: [Number, String], required: true },
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { id: to.params.team }
    teamService.fetchTeam(payload).then(team => next(vm => vm.setTeam(team)))
  },

  data: () => ({ details: new Team({}) }),

  methods: {
    setTeam(team: Team) {
      this.details = team
    },
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
      Team logo name and short will go here
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
