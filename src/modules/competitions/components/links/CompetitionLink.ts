import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { cmDetailsRoute } from "#/competitions/routes";

export default Vue.extend({
  name: "CompetitionLink",

  mixins: [link],

  props: {
    cm: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return cmDetailsRoute({ cm: this.cm });
    }
  }
});
