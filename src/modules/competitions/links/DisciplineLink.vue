<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import CardAction from "@/components/cards/CardAction.vue";

import { cmDisciplineRoute } from "../disciplines/routes";

export default Vue.extend({
  name: "DisciplineLink",

  components: { CardAction },

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" }
  },

  computed: {
    to(): Location {
      return cmDisciplineRoute({ cm: this.cm, discipline: this.discipline });
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
    <slot>Details</slot>
  </CardAction>
</template>
