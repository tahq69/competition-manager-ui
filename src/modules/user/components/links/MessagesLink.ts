import Vue from "vue";
import { Location } from "vue-router";

import { getters } from "@/store";
import { link, visibility } from "@/components/mixins";

import { messagesRoute } from "@/modules/user/routes";
import { MessagesType } from "@/modules/user/typings";

export default Vue.extend({
  name: "MessagesLink",

  mixins: [link, visibility],

  props: {
    msgType: {
      type: String,
      default: "inbox",
      validator: (val: string) => ["inbox", "outbox"].indexOf(val) > -1
    }
  },

  computed: {
    to(): Location {
      const type = this.msgType as MessagesType;
      return messagesRoute({ type });
    }
  },

  methods: {
    checkVisibility(): Promise<boolean> {
      return Promise.resolve(getters.isAuthenticated);
    }
  }
});
