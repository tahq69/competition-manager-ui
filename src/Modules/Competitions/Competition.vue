<script lang="ts">
import Vue from "vue"

import { Competition } from "./Competition"
import AreasLink from "./Links/AreasLink.vue"
import CompetitionLink from "./Links/CompetitionLink.vue"
import DisciplinesLink from "./Links/DisciplinesLink.vue"

export default Vue.extend({
  name: "Competition",

  components: { AreasLink, DisciplinesLink, CompetitionLink },

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
    <CCol :sm="6" :md="4" :lg="3">Judge</CCol>

    <CCol :sm="6" :md="8" :lg="9">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <CompetitionLink :cm="cm" class="nav-link">
                {{ $t("competitions.competition_details_tab") }}
              </CompetitionLink>
            </li>

            <li class="nav-item">
              <DisciplinesLink :cm="cm" class="nav-link">
                {{ $t("competitions.competition_disciplines_tab") }}
              </DisciplinesLink>
            </li>

            <li class="nav-item">
              <AreasLink :cm="cm" class="nav-link">
                {{ $t("competitions.competition_areas_tab") }}
              </AreasLink>
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
