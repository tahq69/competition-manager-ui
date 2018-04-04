<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ManageCompetitionArea",

  props: {
    cm: { type: [Number, String], required: true },
    area: { type: [Number, String], required: true }
  }
});
</script>

<template>
  <div id="manage-competition-area">ManageCompetitionArea.Vue</div>
</template>
