<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import link from "@/components/mixins/link";

import { cmGroups } from "../groups/routes";

export default Vue.extend({
  name: "CompetitionDisciplineGroupsButton",

  mixins: [link],

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return cmGroups({ cm: this.cm, discipline: this.discipline });
    }
  }
});
</script>

<template>
  <router-link :to="to"
               :tag="tag"
               :exact="exact"
               :class="elClass">
    <i v-if="icon"
       :class="_icon"></i>
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
