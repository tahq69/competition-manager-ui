<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";

import { teamMembersRoute } from "../members/routes";

export default Vue.extend({
  name: "Teamlink",

  components: { Btn },

  props: {
    team: { type: [String, Number], required: true },
    tag: { type: String, default: "a" },
    exact: { type: Boolean, default: true }
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
               :exact="exact">
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
