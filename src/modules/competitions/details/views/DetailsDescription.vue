<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "DetailsSection",
  props: {
    title: { type: String, required: true },
    content: { type: String }
  }
});
</script>

<template>
  <li class="list-group-item"
      v-if="content">

    <h4 class="text-muted">{{ title }}</h4>
    <div v-html="content" />

  </li>
</template>

