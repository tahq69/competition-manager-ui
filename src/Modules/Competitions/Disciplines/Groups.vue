<script lang="ts">
import Vue from "vue"

import { Next } from "@/types"

import { Discipline } from "./Discipline"

export default Vue.extend({
  name: "Groups",

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true },
  },
})
</script>

<template>
  <CCol id="discipline-groups"
        :class="`discipline discipline-${discipline}`">
    Groups.vue
  </CCol>
</template>

