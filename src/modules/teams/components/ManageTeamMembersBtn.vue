<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { watchVisibility } from "@/components/auth/mixins";

import { manageTeamMembersRoute } from "#/teams/members/routes";
import { TeamMemberAuth } from "#/teams/members/auth";

export default Vue.extend({
  name: "ManageTeamMembersButton",

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
      const team = this.team;
      return manageTeamMembersRoute({ team });
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
       :exact="exact"
       :arrow="arrow"
       :btn="btn"
       :badge="badge"
       icon="fas fa-list">
    <slot>
      <!-- default slot -->
    </slot>
  </Btn>
</template>
