<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "EditBtn",

  props: {
    to: { type: [Object, String], required: true },
  },
})
</script>


<template>
  <router-link
    :to="to"
    class="btn btn-link btn-sm btn-edit"
  >
    <slot>Edit</slot>
    <i class="fa fa-pencil-square-o"></i>
  </router-link>
</template>

<style lang="scss" scoped>
.btn-edit {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
