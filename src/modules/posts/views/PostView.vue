<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PostView",

  mounted() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <div>PostView.vue</div>
</template>
