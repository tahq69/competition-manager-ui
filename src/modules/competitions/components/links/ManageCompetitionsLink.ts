import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { manageCompetitionsRoute } from "#/competitions/routes";
import { canManageCompetitions } from "#/competitions/auth";

export default Vue.extend({
  name: "ManageCompetitionsLink",

  mixins: [link, visibility],

  props: {
    tooltip: { type: String, default: "Manage competitions" }
  },

  computed: {
    to(): Location {
      return manageCompetitionsRoute();
    }
  },

  methods: {
    async checkVisibility() {
      return await canManageCompetitions();
    }
  }
});
