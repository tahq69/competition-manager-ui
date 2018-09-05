import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { teamMembersRoute } from "#/teams/members/routes";

export default Vue.extend({
  name: "Teamlink",

  mixins: [link],

  props: {
    team: { type: [String, Number], required: true },
    tooltip: { type: String, default: "View team details" }
  },

  computed: {
    to(): Location {
      return teamMembersRoute({ team: this.team });
    }
  },

  watch: {
    team: "__checkVisibility"
  }
});
