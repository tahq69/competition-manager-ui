<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "PanelAction",

  mounted() {
    this.$logger.component(this)
  },

  props: {
    to: { default: () => ({}) },
  },
})
</script>

<template>
  <router-link :to="to"
               class="btn btn-default btn-xs">
    <slot/>
  </router-link>
</template>
