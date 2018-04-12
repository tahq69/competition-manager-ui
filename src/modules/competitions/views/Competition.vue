<script lang="ts">
import Vue from "vue";

import CardActions from "@/components/cards/CardActions.vue";

import AreasBtn from "#/competitions/components/AreasBtn.vue";
import CompetitionBtn from "#/competitions/components/CompetitionBtn.vue";
import DisciplinesBtn from "#/competitions/components/DisciplinesBtn.vue";
import ManageCompetitionBtn from "#/competitions/components/ManageCompetitionBtn.vue";

import { Competition } from "../models/competition";

export default Vue.extend({
  name: "Competition",

  components: {
    CardActions,
    AreasBtn,
    DisciplinesBtn,
    CompetitionBtn,
    ManageCompetitionBtn
  },

  props: {
    cm: { type: [Number, String], required: true }
  },

  computed: {
    competition(): Competition {
      return new Competition({ id: this.cm });
    }
  },

  mounted() {
    this.log = this.$logger.component(this);
  }
});
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
      <div class="card crip-card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <CompetitionBtn :cm="cm"
                              class="nav-link">
                {{ $t("competitions.competition_details_tab") }}
              </CompetitionBtn>
            </li>

            <li class="nav-item">
              <DisciplinesBtn :cm="cm"
                              class="nav-link">
                {{ $t("competitions.competition_disciplines_tab") }}
              </DisciplinesBtn>
            </li>

            <li class="nav-item">
              <AreasBtn :cm="cm"
                        class="nav-link">
                {{ $t("competitions.competition_areas_tab") }}
              </AreasBtn>
            </li>
          </ul>

          <CardActions>
            <ManageCompetitionBtn :cm="cm"
                                  btn="light">
              Edit details
            </ManageCompetitionBtn>
          </CardActions>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <router-view></router-view>
        </div>
      </div>
    </CCol>
  </CRow>
</template>
