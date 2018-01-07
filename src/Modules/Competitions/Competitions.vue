<script lang="ts">
import { createPaging } from "crip-vue-bootstrap"
import Vue from "vue"

import Utils from "@/Helpers/Utils"

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

  mixins: [mixin],

  beforeRouteUpdate(to, from, next) {
    // Make sure we update component heights when entering new page.
    this.maxHeight = 0
    next()
  },

  data() {
    return {
      competitions,
      maxHeight: 0,
    }
  },

  methods: {
    setupHeight(options: { height: number }) {
      if (options.height > this.maxHeight) this.maxHeight = options.height
    },
  },

  mounted() {
    // Debounce window resize event and force badges to update height.
    window.addEventListener("resize", Utils.debounce(() => (this.maxHeight = 0), 100))
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
