<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { watchVisibility } from "@/components/auth/mixins";

import { manageCmDetailsRoute } from "#/competitions/details/routes";
import { CompetitionAuth } from "#/competitions/auth";

export default Vue.extend({
  name: "ManageCompetitionButton",

  components: { Btn },

  mixins: [watchVisibility],

  props: {
    cm: { type: [String, Number], required: true },
    exact: { type: Boolean, default: true },
    btn: { type: String },
    badge: { type: Boolean, default: false },
    arrow: { type: String, default: "" }
  },

  computed: {
    to(): Location {
      return manageCmDetailsRoute({ cm: this.cm });
    }
  },

  methods: {
    async checkVisibility() {
      return await CompetitionAuth.canEdit({ cm: this.cm });
    }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <Btn v-if="isVisible"
       :to="to"
       :exact="exact"
       :btn="btn"
       :badge="badge"
       :arrow="arrow"
       icon="fas fa-edit">
    <slot />
  </Btn>
</template>
