import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { manageCmGroupRoute } from "#/competitions/groups/routes";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "ManageGroupLink",

  mixins: [link, visibility],

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    group: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return manageCmGroupRoute({
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
  }
});
