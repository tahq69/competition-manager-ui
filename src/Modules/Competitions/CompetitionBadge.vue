<script lang="ts">
import Vue from "vue"

import { CompetitionAuth } from "./Auth"
import { Competition } from "./Competition"

export default Vue.extend({
  name: "CompetitionBadge",

  props: {
    competition: { type: Competition, required: true },
    height: { type: Number, required: false },
  },

  data() {
    return {
      canEdit: false,
    }
  },

  computed: {
    elHeight(): string {
      return this.height > 0 ? `${this.height}px` : "auto"
    },
  },

  async created() {
    this.canEdit = await CompetitionAuth.canEdit({ cm: this.competition.id })
  },

  mounted() {
    this.$emit("dimensions", { height: this.$el.offsetHeight })
  },

  watch: {
    height(newHeight: number, oldHeight: number) {
      if (newHeight === 0) {
        Vue.nextTick(() => {
          // Update dimensions when parent says that unified value is unset, but
          // only when auto height is applied to component.
          this.$emit("dimensions", { height: this.$el.offsetHeight })
        })
      }
    },
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
