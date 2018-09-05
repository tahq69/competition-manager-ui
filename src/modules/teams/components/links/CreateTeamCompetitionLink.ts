import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { createCmRoute } from "@/modules/teams/competitions/routes";
import { canCreateCompetition } from "@/modules/teams/auth";

export default Vue.extend({
  name: "CreateTeamCompetitionLink",

  mixins: [link, visibility],

  props: {
    team: { type: [String, Number], required: true },
    tooltip: { type: String, default: "Create new competition" }
  },

  computed: {
    to(): Location {
      return createCmRoute({ team: this.team });
    }
  },

  methods: {
    async checkVisibility() {
      return await canCreateCompetition(this.team);
    }
  },

  watch: {
    team: "__checkVisibility"
  }
});
