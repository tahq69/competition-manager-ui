<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import CardAction from "@/components/cards/CardAction.vue"

import { getDisciplines } from "../disciplines/routes"

export default Vue.extend({
  name: "DisciplinesLink",

  components: { CardAction },

  props: {
    cm: { type: [String, Number], required: true },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" },
  },

  computed: {
    to(): Location {
      return getDisciplines({ cm: this.cm })
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
    <slot>Disciplines</slot>
  </CardAction>
</template>
