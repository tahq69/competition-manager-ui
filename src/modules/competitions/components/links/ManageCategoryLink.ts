import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { manageCategoryRoute } from "#/competitions/groups/routes";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "ManageCategoryLink",

  mixins: [link, visibility],

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    group: { type: [String, Number], required: true },
    category: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return manageCategoryRoute({
        cm: this.cm,
        discipline: this.discipline,
        group: this.group,
        category: this.category
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
    group: "__checkVisibility",
    category: "__checkVisibility"
  }
});
