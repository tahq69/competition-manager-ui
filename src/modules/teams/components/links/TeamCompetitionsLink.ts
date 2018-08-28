import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { teamCompetitionsRoute } from "#/teams/competitions/routes";

export default Vue.extend({
  name: "TeamCompetitionsLink",

  mixins: [link],

  props: {
    team: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return teamCompetitionsRoute({ team: this.team });
    }
  }
});
