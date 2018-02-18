<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "CompetitionArea",

  props: {
    cm: { type: [Number, String], required: true },
    area: { type: [Number, String], required: true },
  },
})
</script>

<template>
  <div id="competition-area">CompetitionArea.Vue</div>
</template>
