<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ResetPassword",

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <div>ResetPassword.vue</div>
</template>
