<script lang="ts">
// Libraries
import Vue from "vue";
import { Location } from "vue-router";

// Root components
import Btn from "@/components/Btn.vue";
import { watchVisibility } from "@/components/auth/mixins";

// Module components
import { createCmRoute } from "#/teams/competitions/routes";
import { CompetitionAuth } from "#/competitions/auth";

export default Vue.extend({
  name: "CreateCompetitionButton",

  components: { Btn },

  mixins: [watchVisibility],

  props: {
    team: { type: [String, Number], required: true },
    badge: { type: Boolean, default: false },
    btn: { type: String }
  },

  computed: {
    to(): Location {
      return createCmRoute({ team: this.team });
    }
  },

  methods: {
    async checkVisibility() {
      return await CompetitionAuth.canCreate({ team: this.team });
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
       icon="far fa-plus-square">
    <slot />
  </Btn>
</template>
