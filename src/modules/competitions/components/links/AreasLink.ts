import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { competitionAreasRoute } from "#/competitions/areas/routes";

export default Vue.extend({
  name: "CompetitionAreasLink",

  mixins: [link],

  props: {
    cm: { type: [String, Number], required: true },
    tooltip: { type: String, default: "View competition areas list" }
  },

  computed: {
    to(): Location {
      return competitionAreasRoute({ cm: this.cm });
    }
  }
});
