<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "CardAction",

  props: {
    to: { type: [Object, String], required: true },
    isBtn: { type: Boolean, default: true },
    isArrow: { type: Boolean, default: true },
    direction: {
      type: String,
      default: "left",
      validator: (val: string) =>
        ["left", "right", "up", "down", ""].indexOf(val) > -1,
    },
  },

  computed: {
    classes(): { [key: string]: boolean } {
      return {
        [this.direction]: !!this.direction,
        "crip-arr": this.isArrow,
        "btn btn-light btn-sm": this.isBtn,
      }
    },
  },
})
</script>


<template>
  <router-link
    exact
    :to="to"
    :class="classes"
  >
    <slot><!-- default slot --></slot>
  </router-link>
</template>
