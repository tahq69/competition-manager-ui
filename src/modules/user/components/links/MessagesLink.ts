import Vue from "vue";
import { Location } from "vue-router";

import { getters } from "@/store";
import { link, visibility } from "@/components/mixins";

import { messagesRoute } from "@/modules/user/routes";

export default Vue.extend({
  name: "MessagesLink",

  mixins: [link, visibility],

  props: {
    type: {
      type: String,
      default: "inbox",
      validator: (val: string) => ["inbox", "outbox"].indexOf(val) > -1
    }
  },

  computed: {
    to(): Location {
      return messagesRoute({ type: this.type });
    }
  },

  methods: {
    checkVisibility(): Promise<boolean> {
      return Promise.resolve(getters.isAuthenticated);
    }
  }
});
