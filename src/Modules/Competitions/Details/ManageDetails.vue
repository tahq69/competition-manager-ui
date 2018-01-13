<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManageCompetitionDetails",

  props: {
    cm: { type: [Number, String], required: true },
  },
})
</script>

<template>
  <div id="manage-competition-details">ManageCompetitionDetails.Vue</div>
</template>
