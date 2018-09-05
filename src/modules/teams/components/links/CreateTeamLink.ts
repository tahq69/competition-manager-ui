import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { createTeamRoute } from "@/modules/teams/routes";
import { TeamAuth } from "@/modules/teams/auth";

export default Vue.extend({
  name: "CreateTeamLink",

  mixins: [link, visibility],

  props: {
    tooltip: { type: String, default: "Create new team" }
  },

  computed: {
    to: (): Location => createTeamRoute()
  },

  methods: {
    async checkVisibility() {
      return await TeamAuth.canCreate();
    }
  }
});
