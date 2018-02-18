<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import CardAction from "@/components/cards/CardAction.vue"

import { getAreas } from "../areas/routes"

export default Vue.extend({
  name: "AreasLink",

  components: { CardAction },

  props: {
    cm: { type: [String, Number], required: true },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" },
  },

  computed: {
    to(): Location {
      return getAreas({ cm: this.cm })
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
    <slot>Areas</slot>
  </CardAction>
</template>
