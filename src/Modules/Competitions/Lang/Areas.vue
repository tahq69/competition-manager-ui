<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "CompetitionAreas",

  props: {
    competitionId: { type: Number, required: true },
  },
})
</script>

<template>
  <div id="competition-areas">CompetitionAreas.Vue</div>
</template>
