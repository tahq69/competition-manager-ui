<script lang="ts">
import Vue from "vue";

import Card from "@/components/cards/card";
import Btn from "@/components/Btn.vue";

import CompetitionBtn from "#/competitions/components/CompetitionBtn.vue";

import { CompetitionAuth } from "../auth";
import { Competition } from "../models/competition";

import { manageCmDetailsRoute } from "../details/routes";

export default Vue.extend({
  name: "CompetitionCard",

  components: { CompetitionBtn, Btn },

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
  <div :id="`competition-${competition.id}`"
       class="card competition-card mt-3 mb-3"
       :style="{height: elHeight}">
    <div class="card-body">
      <h5 class="card-title">{{ competition.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ competition.subtitle }}</h6>
      <div class="card-text">
        <label>Date: {{ competition.organization_date | formatDate }}</label>
        <label v-if="competition.judge_id">Judge: {{ competition.judge_name }}</label>
      </div>

      <CompetitionBtn :cm="competition.id"
                      class="btn btn-primary">
        Details
      </CompetitionBtn>

      <Btn v-if="canEdit"
           :to="manageCmDetailsRoute()"
           btn="primary"
           icon="fas fa-edit" />
    </div>
  </div>
</template>

<style lang="scss">
.competition-card {
  position: relative;

  label {
    display: block;
  }
}
</style>
