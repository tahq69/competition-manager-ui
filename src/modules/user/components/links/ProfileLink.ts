import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";
import { userProfileRoute } from "#/user/routes";

export default Vue.extend({
  name: "ProfileLink",

  mixins: [link],

  props: {
    user: { type: [String, Number], required: true },
    tooltip: { type: String, default: "View user profile" }
  },

  computed: {
    to(): Location {
      return userProfileRoute({ user: this.user });
    }
  }
});
