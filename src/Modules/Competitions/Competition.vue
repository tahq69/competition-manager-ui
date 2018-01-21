<script lang="ts">
import Vue from "vue"

import { Competition } from "./Competition"

export default Vue.extend({
  name: "Competition",

  props: {
    cm: { type: [Number, String], required: true },
  },

  computed: {
    competition(): Competition {
      return new Competition({ id: this.cm })
    },
  },

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <CRow id="manage-competition">
    <CCol :sm="6"
          :md="4"
          :lg="3">
      Judge
    </CCol>

    <CCol :sm="6"
          :md="8"
          :lg="9">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <router-link :to="competition.routes.details"
                           class="nav-link"
                           exact>
                {{ $t("competitions.competition_details_tab") }}
              </router-link>
            </li>

            <li class="nav-item">
              <router-link :to="competition.routes.disciplines"
                           class="nav-link"
                           exact>
                {{ $t("competitions.competition_disciplines_tab") }}
              </router-link>
            </li>

            <li class="nav-item">
              <router-link :to="competition.routes.areas"
                           class="nav-link"
                           exact>
                {{ $t("competitions.competition_areas_tab") }}
              </router-link>
            </li>
          </ul>
        </div><!-- /.card-header -->
        <div class="card-body">
          <router-view></router-view>
        </div>
      </div>
    </CCol>
  </CRow>
</template>
