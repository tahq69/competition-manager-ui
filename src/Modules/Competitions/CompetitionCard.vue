<script lang="ts">
import Vue from "vue"

import Card from "@/Components/Card"
import { CompetitionAuth } from "./Auth"
import { Competition } from "./Competition"

export default Vue.extend({
  name: "CompetitionCard",

  mixins: [Card],

  props: {
    competition: { type: Competition, required: true },
  },

  data() {
    return {
      canEdit: false,
    }
  },

  async created() {
    this.canEdit = await CompetitionAuth.canEdit({ cm: this.competition.id })
  },
})
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

      <router-link :to="competition.routes.details"
                   class="btn btn-primary">
        Details
      </router-link>

      <router-link v-if="canEdit"
                   :to="competition.routes.editDetails"
                   class="btn btn-link btn-sm btn-edit">
        {{ $t("competitions.competition_badge_edit") }}
        <i class="fa fa-pencil-square-o"></i>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.competition-card {
  position: relative;

  .btn-edit {
    position: absolute;
    right: 0;
    top: 0;
  }

  label {
    display: block;
  }
}
</style>
