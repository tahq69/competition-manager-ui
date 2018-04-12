<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";

import { teamMembersRoute } from "../members/routes";

export default Vue.extend({
  name: "TeamButton",

  components: { Btn },

  props: {
    team: { type: [String, Number], required: true },
    exact: { type: Boolean, default: true },
    btn: { type: String },
    badge: { type: Boolean, default: false },
    arrow: { type: String, default: "" },
    withIcon: { type: Boolean, default: false }
  },

  computed: {
    to(): Location {
      const team = this.team;
      return teamMembersRoute({ team });
    }
  }
});
</script>

<template>
  <Btn :to="to"
       :exact="exact"
       :arrow="arrow"
       :btn="btn"
       :badge="badge"
       :icon="withIcon ? 'fas fa-eye' : ''">
    <slot>
      <!-- default slot -->
    </slot>
  </Btn>
</template>
