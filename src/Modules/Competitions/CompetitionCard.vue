<script lang="ts">
import Vue from "vue"

import Card from "@/Components/Cards/Card"
import EditBtn from "@/Components/EditBtn.vue"

import CompetitionLink from "./Links/CompetitionLink.vue"

import { CompetitionAuth } from "./Auth"
import { Competition } from "./Competition"

export default Vue.extend({
  name: "CompetitionCard",

  components: { CompetitionLink, EditBtn },

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
  <div
    :id="`competition-${competition.id}`"
    class="card competition-card mt-3 mb-3"
    :style="{height: elHeight}"
  >
    <div class="card-body">
      <h5 class="card-title">{{ competition.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ competition.subtitle }}</h6>
      <div class="card-text">
        <label>Date: {{ competition.organization_date | formatDate }}</label>
        <label v-if="competition.judge_id">Judge: {{ competition.judge_name }}</label>
      </div>

      <CompetitionLink :cm="competition.id" class="btn btn-primary">
        Details
      </CompetitionLink>

      <EditBtn v-if="canEdit" :to="competition.routes.editDetails" />
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
