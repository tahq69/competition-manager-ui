<script lang="ts">
import Vue from "vue"
export default Vue.extend({ name: "CardActions" })
</script>

<template>
  <div class="card-header-tabs-actions">
    <slot><!-- default slot --></slot>
  </div>
</template>
