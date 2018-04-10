<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";

import { createTeamMemberRoute } from "#/teams/members/routes";
import { TeamMemberAuth } from "#/teams/members/auth";

export default Vue.extend({
  name: "CreateTeamMemberButton",

  components: { Btn },

  props: {
    team: { type: [String, Number], required: true },
    exact: { type: Boolean, default: false },
    btn: { type: String },
    badge: { type: Boolean, default: false },
    arrow: { type: String, default: "" }
  },

  data: () => ({ isVisible: false }),

  computed: {
    to(): Location {
      return createTeamMemberRoute({ team: this.team });
    }
  },

  mounted() {
    TeamMemberAuth.canEditMembers({ team: this.team }).then(
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
       icon="far fa-plus-square">
    <slot />
  </Btn>
</template>
