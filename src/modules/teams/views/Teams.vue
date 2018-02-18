<script lang="ts">
import { createPaging } from "crip-vue-bootstrap"
import Vue from "vue"

import CardWrapper from "@/Components/Cards/CardWrapper"

import teamService from "./Service"
import { Team } from "./Team"
import TeamCard from "./TeamCard.vue"

const { mixin, paging: teams } = createPaging<Team>(paging => {
  paging.perPage = 9
  return teamService.fetchTeams({ paging })
})

export default Vue.extend({
  name: "Teams",

  components: { TeamCard },

  mixins: [mixin, CardWrapper],

  data() {
    return {
      teams,
    }
  },
})
</script>

<template>
  <div id="teams">
    <CRow>
      <CCol
        v-for="team in teams.items"
        :key="team.id"
        :md="4" :sm="6"
      >
        <TeamCard
          :team="team"
          :height="maxHeight"
          @dimensions="setupHeight"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol class="mx-auto">
        <CPagination :paging="teams" />
      </CCol>
    </CRow>
  </div>
</template>
