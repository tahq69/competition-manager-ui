<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditBtn",

  props: {
    to: { type: [Object, String], required: true },
    badge: { type: Boolean, default: false },
    link: { type: Boolean, default: false }
  }
});
</script>


<template>
  <router-link :to="to"
               :class="{
                 'btn btn-sm btn-link': link,
                 'badge badge-light actions': badge,
               }">
    <slot>Edit</slot>
    <i class="fa fa-pencil-square-o"></i>
  </router-link>
</template>
