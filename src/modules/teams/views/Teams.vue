<script lang="ts">
import { createPaging } from "crip-vue-bootstrap"
import Vue from "vue"

import CardWrapper from "@/components/cards/card-wrapper"

import { Team } from "../models/team"
import teamService from "../service"

import TeamCard from "./TeamCard.vue"

const { mixin, paging: teams } = createPaging<Team>(paging => teamService.fetchTeams({ paging }), {
  perPage: 16,
})

export default Vue.extend({
  name: "Teams",

  components: { TeamCard },

  mixins: [mixin, CardWrapper],

  data: () => ({ teams }),
})
</script>

<template>
  <div id="teams">
    <CRow>
      <CCol v-for="team in teams.items"
            :key="team.id"
            :md="3"
            :sm="4">
        <TeamCard :team="team"
                  :height="maxHeight"
                  @dimensions="setupHeight" />
      </CCol>
    </CRow>
    <CRow>
      <CCol class="mx-auto">
        <CPagination :paging="teams" />
      </CCol>
    </CRow>
  </div>
</template>
