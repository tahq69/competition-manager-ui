<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import EditBtn from "@/components/EditBtn.vue";

import { manageTeamMemberRoute } from "#/teams/members/routes";
import { TeamMemberAuth } from "#/teams/members/auth";

export default Vue.extend({
  name: "ManageTeamMemberButton",

  components: { EditBtn },

  props: {
    team: { type: [String, Number], required: true },
    member: { type: [String, Number], required: true },
    badge: { type: Boolean, default: false },
    link: { type: Boolean, default: false }
  },

  data: () => ({ isVisible: false }),

  computed: {
    to(): Location {
      const team = this.team;
      const member = this.member;
      return manageTeamMemberRoute({ team, member });
    }
  },

  async mounted() {
    this.isVisible = await TeamMemberAuth.canEditMembers({ team: this.team });
  }
});
</script>

<template>
  <EditBtn :to="to"
           :badge="badge"
           :link="link">
    <slot />
  </EditBtn>
</template>
