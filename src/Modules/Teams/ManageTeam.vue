<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManageTeam",

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <div>ManageTeam.vue</div>
</template>