<script lang="ts">
import Vue from "vue";

import { arrowTypes, buttonTypes, iconTypes } from "./help";

export default Vue.extend({
  name: "Button",

  props: {
    to: { type: [Object, String], required: true },
    exact: { type: Boolean, default: true },
    badge: { type: Boolean, default: false },
    btn: {
      type: String,
      validator: (value: string) => buttonTypes.indexOf(value) > -1
    },
    icon: {
      type: String,
      validator: (value: string) => iconTypes.indexOf(value) > -1
    },
    arrow: {
      type: String,
      default: "",
      validator: (val: string) => arrowTypes.indexOf(val) > -1
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
