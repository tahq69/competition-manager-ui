<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { teamCompetitionsRoute } from "../competitions/routes";

export default Vue.extend({
  name: "TeamCompetitionsLink",

  props: {
    team: { type: [String, Number], required: true },
    tag: { type: String, default: "a" },
    exact: { type: Boolean, default: true }
  },

  computed: {
    to(): Location {
      return teamCompetitionsRoute({ team: this.team });
    }
  }
});
</script>

<template>
  <router-link :to="to"
               :tag="tag"
               :exact="exact">
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
