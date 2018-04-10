<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";

import { manageCmDetailsRoute } from "#/competitions/details/routes";
import { CompetitionAuth } from "#/competitions/auth";

export default Vue.extend({
  name: "ManageCompetitionButton",

  components: { Btn },

  props: {
    cm: { type: [String, Number], required: true },
    badge: { type: Boolean, default: false },
    btn: { type: String }
  },

  data: () => ({ isVisible: false }),

  computed: {
    to(): Location {
      const cm = this.cm;
      return manageCmDetailsRoute({ cm });
    }
  },

  mounted() {
    CompetitionAuth.canEdit({ cm: this.cm }).then(
      canEdit => (this.isVisible = canEdit)
    );
  }
});
</script>

<template>
  <Btn v-if="isVisible"
       :to="to"
       :badge="badge"
       :btn="btn"
       icon="fas fa-edit">
    <slot />
  </Btn>
</template>
