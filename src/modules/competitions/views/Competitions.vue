<script lang="ts">
import { createPaging } from "crip-vue-bootstrap"
import Vue from "vue"

import CardWrapper from "@/components/cards/card-wrapper"

import { Competition } from "../competition"
import cmService from "../service"

import CompetitionCard from "./CompetitionCard.vue"

const { mixin, paging: competitions } = createPaging<Competition>(paging => {
  paging.perPage = 9
  paging.sort = "organization_date"
  return cmService.fetchCompetitions({ paging })
})

export default Vue.extend({
  name: "Competitions",

  components: { CompetitionCard },

  mixins: [mixin, CardWrapper],

  data() {
    return {
      competitions,
    }
  },
})
</script>

<template>
  <div id="competitions">
    <CRow>
      <CCol
        v-for="competition in competitions.items"
        :key="competition.id"
        :md="4" :sm="6"
      >
        <CompetitionCard
          :competition="competition"
          :height="maxHeight"
          @dimensions="setupHeight"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol class="mx-auto">
        <CPagination :paging="competitions" />
      </CCol>
    </CRow>
  </div>
</template>

<style lang="scss">
#competitions {
  margin-top: -1rem;
}
</style>
