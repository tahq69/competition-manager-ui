<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { watchVisibility } from "@/components/auth/mixins";

import { createTeamMemberRoute } from "#/teams/members/routes";
import { TeamMemberAuth } from "#/teams/members/auth";

export default Vue.extend({
  name: "CreateTeamMemberButton",

  components: { Btn },

  mixins: [watchVisibility],

  props: {
    team: { type: [String, Number], required: true },
    exact: { type: Boolean, default: false },
    btn: { type: String },
    badge: { type: Boolean, default: false },
    arrow: { type: String, default: "" }
  },

  computed: {
    to(): Location {
      return createTeamMemberRoute({ team: this.team });
    }
  },

  methods: {
    async checkVisibility() {
      return await TeamMemberAuth.canEditMembers({ team: this.team });
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
