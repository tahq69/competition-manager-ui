<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";

import { createTeamRoute } from "#/teams/routes";
import { TeamAuth } from "#/teams/auth";

export default Vue.extend({
  name: "CreateTeamButton",

  components: { Btn },

  props: {
    badge: { type: Boolean, default: false },
    btn: { type: String }
  },

  data: () => ({ isVisible: false }),

  computed: {
    to: (): Location => createTeamRoute()
  },

  async mounted() {
    this.isVisible = await TeamAuth.canCreate();
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
