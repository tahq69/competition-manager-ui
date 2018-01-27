<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import CardAction from "@/Components/Cards/CardAction.vue"

import { getCompetitionDiscipline } from "../Routes"

export default Vue.extend({
  name: "DisciplineLink",

  components: { CardAction },

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" },
  },

  computed: {
    to(): Location {
      return getCompetitionDiscipline(this.cm, this.discipline)
    },
  },
})
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
