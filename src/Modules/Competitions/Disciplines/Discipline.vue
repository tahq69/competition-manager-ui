<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Discipline",

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true },
  },
})
</script>

<template>
  <div id="discipline">Discipline.vue</div>
</template>

