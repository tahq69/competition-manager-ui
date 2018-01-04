<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManageCompetitionManagers",

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <div id="manage-competition-managers">manage-competition-managers</div>
</template>

