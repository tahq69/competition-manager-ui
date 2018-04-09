<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import CardAction from "@/components/cards/CardAction.vue";

import { manageTeamMembersRoute } from "#/teams/members/routes";
import { TeamMemberAuth } from "#/teams/members/auth";

export default Vue.extend({
  name: "ManageTeamMembersButton",

  components: { CardAction },

  props: {
    team: { type: [String, Number], required: true },
    exact: { type: Boolean, default: false },
    action: { type: Boolean, default: false },
    direction: { type: String, default: "left" }
  },

  data: () => ({ isVisible: false }),

  computed: {
    to(): Location {
      const team = this.team;
      return manageTeamMembersRoute({ team });
    }
  },

  async mounted() {
    this.isVisible = await TeamMemberAuth.canEditMembers({ team: this.team });
  }
});
</script>

<template>
  <CardAction v-if="isVisible"
              :to="to"
              :isArrow="action"
              :isBtn="action"
              :exact="exact"
              :direction="direction">
    <slot>Manage members</slot>
  </CardAction>
</template>
