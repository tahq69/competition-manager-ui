<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import CardAction from "@/components/cards/CardAction.vue";

import { teamCompetitionsRoute } from "../competitions/routes";

export default Vue.extend({
  name: "TeamCompetitionsButton",

  components: { CardAction },

  props: {
    team: { type: [String, Number], required: true },
    exact: { type: Boolean, default: false },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" }
  },

  computed: {
    to(): Location {
      const team = this.team;
      return teamCompetitionsRoute({ team });
    }
  }
});
</script>

<template>
  <CardAction :to="to"
              :isArrow="action"
              :isBtn="action"
              :exact="exact"
              :direction="direction">
    <slot>Competitions</slot>
  </CardAction>
</template>
