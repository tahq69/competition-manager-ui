import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { competitionMembersRoute } from "@/modules/competitions/members/routes";

export default Vue.extend({
  name: "CompetitionMembersLink",

  mixins: [link],

  props: {
    cm: { type: [String, Number], required: true },
    tooltip: { type: String, default: "View competition members" }
  },

  computed: {
    to(): Location {
      return competitionMembersRoute({ cm: this.cm });
    }
  }
});
