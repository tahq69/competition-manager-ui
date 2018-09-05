import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { createTeamMemberRoute } from "#/teams/members/routes";
import { TeamMemberAuth } from "#/teams/members/auth";

export default Vue.extend({
  name: "CreateTeamMemberLink",

  mixins: [link, visibility],

  props: {
    team: { type: [String, Number], required: true },
    tooltip: { type: String, default: "Create new team member" }
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
  },

  watch: {
    team: "__checkVisibility"
  }
});
