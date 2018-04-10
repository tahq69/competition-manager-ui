<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";

import { manageTeamRoute } from "#/teams/routes";
import { TeamAuth } from "#/teams/auth";

export default Vue.extend({
  name: "ManageTeamButton",

  components: { Btn },

  props: {
    team: { type: [String, Number], required: true },
    badge: { type: Boolean, default: false },
    btn: { type: String }
  },

  data: () => ({ isVisible: false }),

  computed: {
    to(): Location {
      return manageTeamRoute({ team: this.team });
    }
  },

  async mounted() {
    this.isVisible = await TeamAuth.canEdit({ team: this.team });
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
