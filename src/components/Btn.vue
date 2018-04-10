<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Button",

  props: {
    to: { type: [Object, String], required: true },
    exact: { type: Boolean, default: true },
    btn: { type: String },
    badge: { type: Boolean, default: false },
    icon: {
      type: String,
      validator: (value: string) =>
        [
          "fas fa-edit", // edit
          "far fa-plus-square", // create
          "fas fa-list", // list
          "fas fa-eye" // preview
        ].indexOf(value) > -1
    },
    arrow: {
      type: String,
      default: "",
      validator: (val: string) =>
        ["left", "right", "up", "down", ""].indexOf(val) > -1
    }
  }
});
</script>


<template>
  <router-link :to="to"
               :exact="exact"
               :class="{
                 [`crip-arr ${arrow}`]: !!arrow,
                 [`btn btn-sm btn-${btn}`]: !!btn,
                 'badge badge-light actions': badge,
               }">
    <slot>
      <!-- default slot -->
    </slot>
    <i v-if="icon"
       :class="icon"></i>
  </router-link>
</template>
