<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";

import { cmDetailsRoute } from "../details/routes";

export default Vue.extend({
  name: "CompetitionButton",

  components: { Btn },

  props: {
    cm: { type: [String, Number], required: true },
    tag: { type: String, default: "a" },
    exact: { type: Boolean, default: true },
    btn: { type: String },
    badge: { type: Boolean, default: false },
    arrow: { type: String, default: "" },
    withIcon: { type: Boolean, default: false }
  },

  computed: {
    to(): Location {
      return cmDetailsRoute({ cm: this.cm });
    }
  }
});
</script>

<template>
  <Btn :to="to"
       :tag="tag"
       :exact="exact"
       :arrow="arrow"
       :btn="btn"
       :badge="badge"
       :icon="withIcon ? 'fas fa-eye' : ''">
    <slot>
      <!-- default slot -->
    </slot>
  </Btn>
</template>
