<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import CardAction from "@/Components/Cards/CardAction.vue"

import { getGroups } from "../Groups/Routes"

export default Vue.extend({
  name: "GroupsLink",

  components: { CardAction },

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" },
  },

  computed: {
    to(): Location {
      return getGroups({ cm: this.cm, discipline: this.discipline })
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
    <slot>Groups</slot>
  </CardAction>
</template>
