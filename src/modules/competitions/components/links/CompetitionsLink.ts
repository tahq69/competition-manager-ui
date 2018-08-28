import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { competitionsRoute } from "#/competitions/routes";

export default Vue.extend({
  name: "CompetitionLink",

  mixins: [link],

  computed: {
    to(): Location {
      return competitionsRoute();
    }
  }
});
