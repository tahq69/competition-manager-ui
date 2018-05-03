<script lang="ts">
import Vue from "vue";

import Card from "@/components/cards/card";
import Btn from "@/components/Btn.vue";

import CompetitionBtn from "#/competitions/components/CompetitionBtn.vue";
import ManageCompetitionBtn from "#/competitions/components/ManageCompetitionBtn.vue";
import { Competition } from "#/competitions/models/competition";

export default Vue.extend({
  name: "CompetitionCard",

  components: { Btn, CompetitionBtn, ManageCompetitionBtn },

  mixins: [Card],

  props: {
    competition: { type: Competition, required: true }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <CompetitionBtn :cm="competition.id"
                  :id="`competition-${competition.id}`"
                  tag="div"
                  class="card competition-card mt-3 mb-3"
                  :style="{height: elHeight}">
    <div class="card-body">
      <h5 class="card-title">{{ competition.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ competition.subtitle }}</h6>
      <div class="card-text">
        <CRow>
          <CCol :xs="4">Date:</CCol>
          <CCol :xs="8">{{ competition.organization_date | formatDateTime }}</CCol>
        </CRow>
        <CRow v-if="competition.judge_name">
          <CCol :xs="4">Judge:</CCol>
          <CCol :xs="8">{{ competition.judge_name }}</CCol>
        </CRow>
      </div>
      <ManageCompetitionBtn :cm="competition.id"
                            btn="light"
                            class="btn-edit"
                            icon
                            title="Edit competition details" />
    </div>
  </CompetitionBtn>
</template>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";

.competition-card {
  position: relative;

  &:hover {
    background-color: $gray-100;
    cursor: pointer;
  }

  .btn-edit {
    position: absolute;
    right: $card-spacer-y;
    top: $card-spacer-x;
  }
}
</style>
