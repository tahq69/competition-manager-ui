<script lang="ts">
import Vue from "vue"

import { Competition } from "./Competition"

export default Vue.extend({
  name: "CompetitionBadge",

  props: {
    competition: { type: Competition, required: true },
  },
})
</script>

<template>
  <div class="competition-badge">CompetitionBadge.vue {{ competition.id }}</div>
</template>

