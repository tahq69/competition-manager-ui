<script lang="ts">
import Vue from "vue"

import { Competition } from "./Competition"

export default Vue.extend({
  name: "Competition",

  props: {
    competitionId: { type: Number, required: true },
  },

  computed: {
    competition(): Competition {
      return new Competition({ id: this.competitionId })
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
        <ul class="nav nav-tabs">
          <router-link :to="competition.routes.details"
                       tag="li"
                       exact>
            <a>{{ $t("competitions.competition_details_tab") }}</a>
          </router-link>

          <router-link :to="competition.routes.disciplines"
                       tag="li">
            <a>{{ $t("competitions.competition_disciplines_tab") }}</a>
          </router-link>

          <router-link :to="competition.routes.areas"
                       tag="li">
            <a>{{ $t("competitions.competition_areas_tab") }}</a>
          </router-link>
        </ul>

        <router-view></router-view>
      </CCol>
    </CRow>
  </CCol>
</template>
