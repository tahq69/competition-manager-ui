<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PostList",

  mounted() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <div>PostList.vue</div>
</template>
