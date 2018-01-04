<script lang="ts">
import Vue from "vue"
import { Route } from "vue-router"

import { User } from "@/Components/Auth/User"
import { Next } from "@/types"

import { Competition } from "./Competition"
import competitionService from "./Service"

interface IData {
  competition: Competition
  judge: User | null
}

export default Vue.extend({
  name: "ManageCompetition",

  data(): IData {
    return {
      competition: {} as Competition,
      judge: null
    }
  },

  async beforeRouteEnter(to: Route, from: Route, next: Next<any>) {
    // Pre-load competition while this component is not open.
    const competition = await competitionService.fetchCompetition({ id: to.params.id })
    next(vm => vm.setCompetition(competition))
  },

  methods: {
    async setCompetition(competition: Competition) {
      this.log("setCompetition()", { competition })
      this.competition = competition
    },
  },

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <CCol id="manage-competition">
    <CRow>
      <CCol :sm="6"
            :md="4"
            :lg="3">
        Judge
      </CCol>
      <CCol :sm="6"
            :md="8"
            :lg="9">
        Content
      </CCol>
    </CRow>
  </CCol>
</template>
