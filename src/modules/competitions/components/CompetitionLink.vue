<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { cmDetailsRoute } from "#/competitions/details/routes";

export default Vue.extend({
  name: "CompetitionLink",

  mixins: [link],

  props: {
    cm: { type: [String, Number], required: true }
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
               :class="elClass">
    <i v-if="icon"
       :class="icon"></i>
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
