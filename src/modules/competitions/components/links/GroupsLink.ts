import Vue from "vue";
import { Location } from "vue-router";

import link from "@/components/mixins/link";

import { cmGroups } from "#/competitions/groups/routes";

export default Vue.extend({
  name: "CompetitionDisciplineGroupsButton",

  mixins: [link],

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    tooltip: { type: String, default: "View competition discipline groups" }
  },

  computed: {
    to(): Location {
      return cmGroups({ cm: this.cm, discipline: this.discipline });
    }
  }
});
