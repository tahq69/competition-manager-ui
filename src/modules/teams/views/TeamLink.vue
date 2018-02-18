<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import CardAction from "@/components/cards/CardAction.vue"

import { getTeamDetails } from "../routes"

export default Vue.extend({
  name: "TeamLink",

  components: { CardAction },

  props: {
    team: { type: [String, Number], required: true },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" },
  },

  computed: {
    to(): Location {
      return getTeamDetails({ team: this.team })
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
    <slot>Team</slot>
  </CardAction>
</template>
