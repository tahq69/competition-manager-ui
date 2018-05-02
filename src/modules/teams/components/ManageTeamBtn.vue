<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { watchVisibility } from "@/components/auth/mixins";

import { manageTeamRoute } from "#/teams/routes";
import { TeamAuth } from "#/teams/auth";

export default Vue.extend({
  name: "ManageTeamButton",

  components: { Btn },

  mixins: [watchVisibility],

  props: {
    team: { type: [String, Number], required: true },
    exact: { type: Boolean, default: true },
    btn: { type: String },
    btnOutline: { type: Boolean, default: false },
    badge: { type: Boolean, default: false },
    arrow: { type: String, default: "" }
  },

  computed: {
    to(): Location {
      return manageTeamRoute({ team: this.team });
    }
  },

  methods: {
    async checkVisibility() {
      return await TeamAuth.canEdit({ team: this.team });
    }
  }
});
</script>

<template>
  <Btn v-if="isVisible"
       :to="to"
       :exact="exact"
       :arrow="arrow"
       :badge="badge"
       :btn="btn"
       :btn-outline="btnOutline"
       icon="fas fa-edit">
    <slot />
  </Btn>
</template>
