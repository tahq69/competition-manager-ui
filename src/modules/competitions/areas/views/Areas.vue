<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CompetitionAreas",

  props: {
    cm: { type: [Number, String], required: true }
  }
});
</script>

<template>
  <div id="competition-areas">CompetitionAreas.Vue</div>
</template>
