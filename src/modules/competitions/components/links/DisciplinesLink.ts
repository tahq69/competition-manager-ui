import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { cmDisciplinesRoute } from "#/competitions/disciplines/routes";

export default Vue.extend({
  name: "CompetitionDisciplinesLink",

  mixins: [link],

  props: {
    cm: { type: [String, Number], required: true },
    tooltip: { type: String, default: "View competition disciplines list" }
  },

  computed: {
    to(): Location {
      return cmDisciplinesRoute({ cm: this.cm });
    }
  }
});
