<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { competitionsRoute } from "#/competitions/routes";

export default Vue.extend({
  name: "CompetitionLink",

  mixins: [link],

  computed: {
    to(): Location {
      return competitionsRoute();
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
