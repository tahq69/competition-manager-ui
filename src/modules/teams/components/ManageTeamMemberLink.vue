<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { link, watchVisibility } from "@/components/mixins";

import { manageTeamMemberRoute } from "#/teams/members/routes";
import { TeamMemberAuth } from "#/teams/members/auth";

export default Vue.extend({
  name: "ManageTeamMemberLink",

  mixins: [link, watchVisibility],

  props: {
    team: { type: [String, Number], required: true },
    member: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return manageTeamMemberRoute({ team: this.team, member: this.member });
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
  <router-link v-if="isVisible"
               :to="to"
               :tag="tag"
               :exact="exact"
               :class="elClass">
    <i v-if="icon"
       :class="icon"></i>
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
