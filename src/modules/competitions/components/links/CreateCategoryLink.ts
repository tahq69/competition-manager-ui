import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { createCategoryRoute } from "#/competitions/groups/routes";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "CreateCategoryLink",

  mixins: [link, visibility],

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    group: { type: [String, Number], required: true },
    tooltip: { type: String, default: "Create new category" }
  },

  computed: {
    to(): Location {
      return createCategoryRoute({
        cm: this.cm,
        discipline: this.discipline,
        group: this.group
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
    discipline: "__checkVisibility",
    group: "__checkVisibility"
  }
});
