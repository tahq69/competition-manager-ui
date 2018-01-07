<script lang="ts">
import Vue from "vue"
import { Route } from "vue-router"

import { User } from "@/Components/Auth/User"
import { Next } from "@/types"

import { Competition } from "./Competition"
import competitionService from "./Service"

export default Vue.extend({
  name: "Competition",

  props: {
    competition_id: { type: Number, required: true },
  },

  computed: {
    id(): number {
      return this.competition_id
    },

    competition(): Competition {
      return new Competition({ id: this.id })
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
          <router-link :to="competition.routes.editDetails"
                       tag="li">
            <a>{{ $t("competitions.competition_edit_details_tab") }}</a>
          </router-link>

          <router-link :to="competition.routes.disciplines"
                       tag="li">
            <a>{{ $t("competitions.competition_disciplines_tab") }}</a>
          </router-link>

          <router-link :to="competition.routes.editAreas"
                       tag="li">
            <a>{{ $t("competitions.competition_edit_areas_tab") }}</a>
          </router-link>

          <router-link :to="competition.routes.editManagers"
                       tag="li">
            <a>{{ $t("competitions.competition_edit_managers_tab") }}</a>
          </router-link>
        </ul>

        <router-view></router-view>
      </CCol>
    </CRow>
  </CCol>
</template>
