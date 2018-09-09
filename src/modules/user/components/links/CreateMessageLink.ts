import Vue from "vue";
import { Location } from "vue-router";

import { getters } from "@/store";
import { link, visibility } from "@/components/mixins";

import { createMessageRoute } from "@/modules/user/routes";

export default Vue.extend({
  name: "CreateMessageLink",

  mixins: [link, visibility],

  computed: {
    to(): Location {
      return createMessageRoute();
    }
  },

  methods: {
    checkVisibility(): Promise<boolean> {
      return Promise.resolve(getters.isAuthenticated);
    }
  }
});
