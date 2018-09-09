import Vue from "vue";
import { Location } from "vue-router";

import { getters } from "@/store";
import { link, visibility } from "@/components/mixins";

import { messageRoute } from "@/modules/user/routes";

export default Vue.extend({
  name: "MessageLink",

  mixins: [link, visibility],

  props: {
    message: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return messageRoute({ message: this.message });
    }
  },

  methods: {
    checkVisibility(): Promise<boolean> {
      return Promise.resolve(getters.isAuthenticated);
    }
  }
});
