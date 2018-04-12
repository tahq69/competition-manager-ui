<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { watchVisibility } from "@/components/auth/mixins";

import { createTeamRoute } from "#/teams/routes";
import { TeamAuth } from "#/teams/auth";

export default Vue.extend({
  name: "CreateTeamButton",

  components: { Btn },

  mixins: [watchVisibility],

  props: {
    badge: { type: Boolean, default: false },
    btn: { type: String }
  },

  computed: {
    to: (): Location => createTeamRoute()
  },

  methods: {
    async checkVisibility() {
      return await TeamAuth.canCreate();
    }
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
