<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "CompetitionArea",

  props: {
    competitionId: { type: Number, required: true },
    id: { type: Number, required: true },
  },
})
</script>

<template>
  <div id="competition-area">CompetitionArea.Vue</div>
</template>
