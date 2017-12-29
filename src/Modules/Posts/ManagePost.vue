<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManagePost",

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <div>ManagePost.vue</div>
</template>
