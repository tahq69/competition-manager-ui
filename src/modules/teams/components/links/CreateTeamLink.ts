import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { createTeamRoute } from "#/teams/routes";
import { TeamAuth } from "#/teams/auth";

export default Vue.extend({
  name: "CreateTeamLink",

  mixins: [link, visibility],

  computed: {
    to: (): Location => createTeamRoute()
  },

  methods: {
    async checkVisibility() {
      return await TeamAuth.canCreate();
    }
  }
});
