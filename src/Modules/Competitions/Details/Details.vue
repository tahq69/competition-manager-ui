<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "CompetitionDetails",

  props: {
    competitionId: { type: Number, required: true },
  },
})
</script>

<template>
  <div id="competition-details">CompetitionDetails.Vue</div>
</template>
