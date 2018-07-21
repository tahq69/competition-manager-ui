<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { teamMembersRoute } from "#/teams/members/routes";

export default Vue.extend({
  name: "Teamlink",

  mixins: [link],

  props: {
    team: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return teamMembersRoute({ team: this.team });
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
