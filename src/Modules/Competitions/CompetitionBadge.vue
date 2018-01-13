<script lang="ts">
import Vue from "vue"

import Badge from "@/Components/Badge"
import { CompetitionAuth } from "./Auth"
import { Competition } from "./Competition"

export default Vue.extend({
  name: "CompetitionBadge",

  mixins: [Badge],

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
       class="img-thumbnail competition-badge"
       :style="{height: elHeight}">
    <router-link v-if="canEdit"
                 :to="competition.routes.editDetails"
                 class="badge-edit btn btn-xs btn-link">
      {{ $t("competitions.competition_badge_edit") }}
      <i class="fa fa-pencil-square-o"></i>
    </router-link>

    <h4>
      <router-link :to="competition.routes.details">
        {{ competition.title }}<br>
        <small>{{ competition.subtitle }}</small>
      </router-link>
    </h4>
    <label>Date: {{ competition.organization_date | formatDate }}</label>
    <label v-if="competition.judge_id">Judge: {{ competition.judge_name }}</label>
  </div>
</template>

<style lang="scss">
.competition-badge {
  display: block;
  margin-bottom: 15px;
  margin-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;

  .badge-edit {
    position: absolute;
    right: 0;
    top: 0;
  }

  label {
    display: block;
    position: relative;
    bottom: 0;
  }
}
</style>
