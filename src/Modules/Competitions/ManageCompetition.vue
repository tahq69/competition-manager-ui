<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManageCompetition",

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <div>ManageCompetition.vue</div>
</template>
