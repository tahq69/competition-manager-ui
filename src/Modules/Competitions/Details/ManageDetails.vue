<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManageDetails",

  props: {
    competitionId: { type: Number, required: true },
  },
})
</script>

<template>
  <div id="competition-manage-details">ManageDetails.Vue</div>
</template>
