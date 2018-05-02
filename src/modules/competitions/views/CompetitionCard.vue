<script lang="ts">
import Vue from "vue";

import Card from "@/components/cards/card";
import Btn from "@/components/Btn.vue";

import CompetitionBtn from "#/competitions/components/CompetitionBtn.vue";
import ManageCompetitionBtn from "#/competitions/components/ManageCompetitionBtn.vue";

import { CompetitionAuth } from "../auth";
import { Competition } from "../models/competition";

import { manageCmDetailsRoute } from "../details/routes";

export default Vue.extend({
  name: "CompetitionCard",

  components: { Btn, CompetitionBtn, ManageCompetitionBtn },

  mixins: [Card],

  props: {
    competition: { type: Competition, required: true }
  },

  data: () => ({ canEdit: false }),

  methods: {
    manageCmDetailsRoute() {
      return manageCmDetailsRoute({ cm: this.competition.id });
    }
  },

  created() {
    CompetitionAuth.canEdit({ cm: this.competition.id }).then(
      canEdit => (this.canEdit = canEdit)
    );
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
        <label>Date: {{ competition.organization_date | formatDate }}</label>
        <label v-if="competition.judge_id">Judge: {{ competition.judge_name }}</label>
      </div>

      <ManageCompetitionBtn :cm="competition.id"
                            btn="light"
                            class="btn-edit"
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

  label {
    display: block;
  }

  .btn-edit {
    position: absolute;
    right: $card-spacer-y;
    top: $card-spacer-x;
  }
}
</style>
