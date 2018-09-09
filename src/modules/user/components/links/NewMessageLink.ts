import Vue from "vue";
import { Location } from "vue-router";

import { getters } from "@/store";
import { link, visibility } from "@/components/mixins";

import { newMessageRoute } from "@/modules/user/routes";

export default Vue.extend({
  name: "NewMessageLink",

  mixins: [link, visibility],

  computed: {
    to(): Location {
      return newMessageRoute();
    }
  },

  methods: {
    checkVisibility(): Promise<boolean> {
      return Promise.resolve(getters.isAuthenticated);
    }
  }
});
