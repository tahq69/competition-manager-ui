<script lang="ts">
import Vue from "vue";

import { isInArrayValidator } from "@/helpers";
import {
  arrowTypes,
  badgeTypes,
  buttonTypes,
  iconTypes
} from "@/components/help";

export default Vue.extend({
  name: "Button",

  props: {
    to: { type: [Object, String], required: true },
    tag: { type: String, default: "a" },
    exact: { type: Boolean, default: true },
    badge: { type: Boolean, default: false },
    badgeColor: {
      type: String,
      default: "light",
      validator: isInArrayValidator(badgeTypes)
    },
    btnOutline: { type: Boolean, default: false },
    btnBlock: { type: Boolean, default: false },
    btn: {
      type: String,
      validator: isInArrayValidator(buttonTypes)
    },
    btnSize: {
      type: String,
      default: "sm",
      validator: isInArrayValidator(["sm", "lg", ""])
    },
    arrow: {
      type: String,
      default: "",
      validator: isInArrayValidator(arrowTypes)
    },
    icon: {
      type: String,
      validator: isInArrayValidator(iconTypes)
    }
  }
});
</script>


<template>
  <router-link :to="to"
               :tag="tag"
               :exact="exact"
               :class="{
                 'btn': btn,
                 [`btn-${btn}`]: btn && !btnOutline,
                 [`btn-outline-${btn}`]: btn && btnOutline,
                 [`btn-${btnSize}`]: btn && btnSize,
                 [`crip-arr ${arrow}`]: arrow,
                 [`badge badge-${badgeColor} actions`]: badge,
               }">
    <slot>
      <!-- default slot -->
    </slot>
    <span v-if="icon && badge">&nbsp;</span>
    <i v-if="icon"
       :class="icon"></i>
  </router-link>
</template>
