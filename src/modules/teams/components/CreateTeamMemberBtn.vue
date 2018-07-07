<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { visibility } from "@/components/mixins";

import { createTeamMemberRoute } from "#/teams/members/routes";
import { TeamMemberAuth } from "#/teams/members/auth";

export default Vue.extend({
  name: "CreateTeamMemberButton",

  components: { Btn },

  mixins: [visibility],

  props: {
    team: { type: [String, Number], required: true },
    tag: { type: String, default: "a" },
    exact: { type: Boolean, default: true },
    badge: { type: Boolean, default: false },
    badgeColor: { type: String, default: "light" },
    btnOutline: { type: Boolean, default: false },
    btnBlock: { type: Boolean, default: false },
    btn: { type: String, default: "" },
    btnSize: { type: String, default: "sm" },
    arrow: { type: String, default: "" },
    icon: { type: Boolean, default: false }
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
       :tag="tag"
       :exact="exact"
       :badge="badge"
       :badge-color="badgeColor"
       :btn="btn"
       :btn-outline="btnOutline"
       :btn-block="btnBlock"
       :btn-size="btnSize"
       :arrow="arrow"
       :icon="icon ? 'far fa-plus-square' : ''">
    <slot>
      <!-- default slot -->
    </slot>
  </Btn>
</template>
