<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManageCompetitionArea",

  props: {
    competitionId: { type: Number, required: true },
    id: { type: Number, required: true },
  },
})
</script>

<template>
  <div id="manage-competition-area">ManageCompetitionArea.Vue</div>
</template>
