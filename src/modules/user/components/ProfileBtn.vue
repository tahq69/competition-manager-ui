<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";

import { userProfileRoute } from "../routes";

export default Vue.extend({
  name: "ProfileButton",

  components: { Btn },

  props: {
    user: { type: [String, Number], required: true },
    exact: { type: Boolean, default: true },
    btn: { type: String },
    badge: { type: Boolean, default: false },
    arrow: { type: String, default: "" }
  },

  computed: {
    to(): Location {
      const user = this.user;
      return userProfileRoute({ user });
    }
  }
});
</script>

<template>
  <Btn :to="to"
       :exact="exact"
       :arrow="arrow"
       :btn="btn"
       :badge="badge">
    <slot>
      <!-- default slot -->
    </slot>
  </Btn>
</template>
