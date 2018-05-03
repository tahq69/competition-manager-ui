<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import CardAction from "@/components/cards/CardAction.vue";

import { cmDisciplinesRoute } from "../disciplines/routes";

export default Vue.extend({
  name: "CompetitionDisciplinesButton",

  components: { CardAction },

  props: {
    cm: { type: [String, Number], required: true },
    tag: { type: String, default: "a" },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" }
  },

  computed: {
    to(): Location {
      return cmDisciplinesRoute({ cm: this.cm });
    }
  }
});
</script>

<template>
  <CardAction :to="to"
              :tag="tag"
              :isArrow="action"
              :isBtn="action"
              :direction="direction">
    <slot>Disciplines</slot>
  </CardAction>
</template>
