<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import link from "@/components/mixins/link";

import { cmDisciplineRoute } from "#/competitions/disciplines/routes";

export default Vue.extend({
  name: "CompetitionDisciplineLink",

  mixins: [link],

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return cmDisciplineRoute({ cm: this.cm, discipline: this.discipline });
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
