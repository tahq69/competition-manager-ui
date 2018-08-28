import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { manageTeamRoute } from "#/teams/routes";
import { TeamAuth } from "#/teams/auth";

export default Vue.extend({
  name: "ManageTeamLink",

  mixins: [link, visibility],

  props: {
    team: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return manageTeamRoute({ team: this.team });
    }
  },

  methods: {
    async checkVisibility() {
      return await TeamAuth.canEdit({ team: this.team });
    }
  }
});
