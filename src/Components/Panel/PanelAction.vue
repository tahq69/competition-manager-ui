<template>
  <router-link :to="to" class="btn btn-default btn-xs">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
export default {
  name: "PanelAction",

  mounted() {
    this.$logger.component(this)
  },

  props: {
    to: { default: () => ({}) },
  },
}
</script>