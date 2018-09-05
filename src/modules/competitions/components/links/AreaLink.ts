import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";

import { areaRoute } from "@/modules/competitions/areas/routes";

export default Vue.extend({
  name: "AreaLink",

  mixins: [link],

  props: {
    cm: { type: [String, Number], required: true },
    area: { type: [String, Number], required: true },
    tooltip: { type: String, default: "View area details" }
  },

  computed: {
    to(): Location {
      return areaRoute({ cm: this.cm, area: this.area });
    }
  }
});
