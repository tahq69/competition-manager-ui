import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { manageTeamMembersRoute } from "#/teams/members/routes";
import { TeamMemberAuth } from "#/teams/members/auth";

export default Vue.extend({
  name: "ManageTeamMembersLink",

  mixins: [link, visibility],

  props: {
    team: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return manageTeamMembersRoute({ team: this.team });
    }
  },

  methods: {
    async checkVisibility() {
      return await TeamMemberAuth.canEditMembers({ team: this.team });
    }
  }
});
