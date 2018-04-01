<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import CardAction from "@/components/cards/CardAction.vue"

import { teamMembersRoute } from "../members/routes"

export default Vue.extend({
  name: "TeamLink",

  components: { CardAction },

  props: {
    team: { type: [String, Number], required: true },
    exact: { type: Boolean, default: false },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" },
  },

  computed: {
    to(): Location {
      const team = this.team
      return teamMembersRoute({ team })
    },
  },
})
</script>

<template>
  <CardAction :to="to"
              :isArrow="action"
              :isBtn="action"
              :exact="exact"
              :direction="direction">
    <slot>Members</slot>
  </CardAction>
</template>
