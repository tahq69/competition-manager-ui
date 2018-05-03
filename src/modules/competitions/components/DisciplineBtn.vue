<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";

import { cmDisciplineRoute } from "../disciplines/routes";

export default Vue.extend({
  name: "CompetitionDisciplineButton",

  components: { Btn },

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    tag: { type: String, default: "a" }
  },

  computed: {
    to(): Location {
      return cmDisciplineRoute({ cm: this.cm, discipline: this.discipline });
    }
  }
});
</script>

<template>
  <Btn :to="to"
       :tag="tag">
    <slot>
      <!-- default slot -->
    </slot>
  </Btn>
</template>
