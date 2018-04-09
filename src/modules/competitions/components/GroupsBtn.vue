<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import CardAction from "@/components/cards/CardAction.vue";

import { cmGroups } from "../groups/routes";

export default Vue.extend({
  name: "CompetitionDisciplineGroupsButton",

  components: { CardAction },

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" }
  },

  computed: {
    to(): Location {
      return cmGroups({ cm: this.cm, discipline: this.discipline });
    }
  }
});
</script>

<template>
  <CardAction
    :to="to"
    :isArrow="action"
    :isBtn="action"
    :direction="direction"
  >
    <slot>Groups</slot>
  </CardAction>
</template>
