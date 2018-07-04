<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { cmDetailsRoute } from "#/competitions/details/routes";

export default Vue.extend({
  name: "CompetitionLink",

  props: {
    cm: { type: [String, Number], required: true },
    tag: { type: String, default: "a" },
    exact: { type: Boolean, default: true }
  },

  computed: {
    to(): Location {
      return cmDetailsRoute({ cm: this.cm });
    }
  }
});
</script>

<template>
  <router-link :to="to"
               :tag="tag"
               :exact="exact"
               style="cursor: pointer">
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
