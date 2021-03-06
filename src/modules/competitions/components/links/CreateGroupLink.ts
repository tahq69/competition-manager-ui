import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { createCmGroup } from "#/competitions/groups/routes";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "CreateGroupLink",

  mixins: [link, visibility],

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    tooltip: { type: String, default: "Create new group" }
  },

  computed: {
    to(): Location {
      return createCmGroup({
        cm: this.cm,
        discipline: this.discipline
      });
    }
  },

  methods: {
    async checkVisibility() {
      return await DisciplineAuth.canEdit(this.discipline, this.cm);
    }
  },

  watch: {
    cm: "__checkVisibility",
    discipline: "__checkVisibility"
  }
});
