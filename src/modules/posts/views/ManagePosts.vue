<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManagePosts",

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <div>ManagePosts.vue</div>
</template>
