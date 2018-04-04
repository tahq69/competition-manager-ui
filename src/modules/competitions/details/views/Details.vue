<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CompetitionDetails",

  props: {
    cm: { type: [Number, String], required: true }
  }
});
</script>

<template>
  <div id="competition-details">CompetitionDetails.Vue</div>
</template>
