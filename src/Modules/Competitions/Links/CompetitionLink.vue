<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import CardAction from "@/Components/Cards/CardAction.vue"

import { getCompetitionDetails } from "../Routes"

export default Vue.extend({
  name: "CompetitionLink",

  components: { CardAction },

  props: {
    cm: { type: [String, Number], required: true },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" },
  },

  computed: {
    to(): Location {
      return getCompetitionDetails(this.cm)
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
    <slot>Competition</slot>
  </CardAction>
</template>
