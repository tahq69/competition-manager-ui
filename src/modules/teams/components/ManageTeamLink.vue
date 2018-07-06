<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { watchVisibility } from "@/components/auth/mixins";

import { manageTeamRoute } from "#/teams/routes";
import { TeamAuth } from "#/teams/auth";

export default Vue.extend({
  name: "ManageTeamLink",

  mixins: [watchVisibility],

  props: {
    team: { type: [String, Number], required: true },
    tag: { type: String, default: "a" },
    exact: { type: Boolean, default: true }
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
  <router-link v-if="isVisible"
               :to="to"
               :tag="tag"
               :exact="exact">
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
