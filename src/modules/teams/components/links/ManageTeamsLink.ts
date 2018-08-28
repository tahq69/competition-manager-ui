import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { manageTeamsRoute } from "#/teams/routes";
import { TeamAuth } from "#/teams/auth";

export default Vue.extend({
  name: "ManageTeamsLink",

  mixins: [link, visibility],

  computed: {
    to: (): Location => manageTeamsRoute()
  },

  methods: {
    async checkVisibility() {
      return await TeamAuth.canCreate();
    }
  }
});
