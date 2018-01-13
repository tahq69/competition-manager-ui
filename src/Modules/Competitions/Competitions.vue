<script lang="ts">
import { createPaging } from "crip-vue-bootstrap"
import Vue from "vue"

import BadgeWrapper from "@/Components/BadgeWrapper"

import { Competition } from "./Competition"
import CompetitionBadge from "./CompetitionBadge.vue"
import cmService from "./Service"

const { mixin, paging: competitions } = createPaging<Competition>(paging => {
  paging.perPage = 9
  paging.sort = "organization_date"
  return cmService.fetchCompetitions({ paging })
})

export default Vue.extend({
  name: "Competitions",

  components: { CompetitionBadge },

  mixins: [mixin, BadgeWrapper],

  data() {
    return {
      competitions,
    }
  },
})
</script>

<template>
  <CCol id="competitions">
    <CRow>
      <CCol v-for="competition in competitions.items"
            :key="competition.id"
            :md="4"
            :sm="6">
        <CompetitionBadge :competition="competition"
                          :height="maxHeight"
                          @dimensions="setupHeight" />
      </CCol>
      <CCol class="text-center">
        <CPagination :paging="competitions" />
      </CCol>
    </CRow>
  </CCol>
</template>

<style lang="scss">
#competitions {
  margin-top: -15px;
}
</style>
