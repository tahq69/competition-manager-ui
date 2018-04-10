<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";

import { manageTeamMemberRoute } from "#/teams/members/routes";
import { TeamMemberAuth } from "#/teams/members/auth";

export default Vue.extend({
  name: "ManageTeamMemberButton",

  components: { Btn },

  props: {
    team: { type: [String, Number], required: true },
    member: { type: [String, Number], required: true },
    badge: { type: Boolean, default: false },
    btn: { type: String }
  },

  data: () => ({ isVisible: false }),

  computed: {
    to(): Location {
      const team = this.team;
      const member = this.member;
      return manageTeamMemberRoute({ team, member });
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
       icon="fas fa-edit">
    <slot />
  </Btn>
</template>
