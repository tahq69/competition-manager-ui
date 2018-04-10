<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditBtn",

  props: {
    to: { type: [Object, String], required: true },
    btn: { type: String },
    badge: { type: Boolean, default: false },
    icon: {
      type: String,
      validator: (value: string) =>
        ["fas fa-edit", "far fa-plus-square", "fas fa-list"].indexOf(value) > -1
    }
  }
});
</script>


<template>
  <router-link :to="to"
               :class="{
                 [`btn btn-sm btn-${btn}`]: !!btn,
                 'badge badge-light actions': badge,
               }">
    <slot>Edit </slot>
    <i v-if="icon"
       :class="icon"></i>
  </router-link>
</template>
