<script lang="ts">
import { createPaging } from "crip-vue-bootstrap"
import Vue, { ComponentOptions } from "vue"

import { Pagination } from "@/Helpers"
import { Next } from "@/types"

import { Competition } from "./Competition"
import CompetitionBadge from "./CompetitionBadge.vue"
import cmService from "./Service"

const { mixin, paging: competitions } = createPaging<Competition>(paging => {
  return cmService.fetchCompetitions({ paging })
})

export default Vue.extend({
  name: "Competitions",

  components: { CompetitionBadge },

  mixins: [mixin],

  data() {
    return {
      competitions,
    }
  },
})
</script>

<template>
  <CCol>
    <CRow>
      <CCol v-for="competition in competitions.items"
            :key="competition.id"
            :md="4"
            :sm="6">
        <CompetitionBadge :competition="competition" />
      </CCol>
    </CRow>
  </CCol>
</template>

