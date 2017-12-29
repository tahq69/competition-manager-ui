<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManageCompetitions",

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <div>ManageCompetitions.vue</div>
</template>
