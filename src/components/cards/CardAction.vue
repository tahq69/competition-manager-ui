<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CardAction",

  props: {
    to: { type: [Object, String], required: true },
    exact: { type: Boolean, default: true },
    isBtn: { type: Boolean, default: true },
    isArrow: { type: Boolean, default: true },
    direction: {
      type: String,
      default: "left",
      validator: (val: string) =>
        ["left", "right", "up", "down", ""].indexOf(val) > -1
    }
  },

  computed: {
    classes(): { [key: string]: boolean } {
      return {
        [this.direction]: !!this.direction,
        "crip-arr": this.isArrow,
        "btn btn-light btn-sm": this.isBtn
      };
    }
  }
});
</script>


<template>
  <router-link :exact="exact"
               :to="to"
               :class="classes">
    &nbsp;
    <slot>
      <!-- default slot -->
    </slot>&nbsp;
  </router-link>
</template>
