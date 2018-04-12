<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { watchIsVisible } from "@/components/auth/mixins";

import { manageCmDetailsRoute } from "#/competitions/details/routes";
import { CompetitionAuth } from "#/competitions/auth";

export default Vue.extend({
  name: "ManageCompetitionButton",

  components: { Btn },

  mixins: [watchIsVisible],

  props: {
    cm: { type: [String, Number], required: true },
    badge: { type: Boolean, default: false },
    btn: { type: String }
  },

  computed: {
    to(): Location {
      const cm = this.cm;
      return manageCmDetailsRoute({ cm });
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
       :badge="badge"
       :btn="btn"
       icon="fas fa-edit">
    <slot />
  </Btn>
</template>
