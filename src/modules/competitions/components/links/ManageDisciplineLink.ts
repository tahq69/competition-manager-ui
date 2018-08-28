import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { manageCmDisciplineRoute } from "#/competitions/disciplines/routes";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "ManageCompetitionDisciplineLink",

  mixins: [link, visibility],

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return manageCmDisciplineRoute({
        cm: this.cm,
        discipline: this.discipline
      });
    }
  },

  methods: {
    async checkVisibility() {
      return await DisciplineAuth.canEdit(this.discipline, this.cm);
    }
  }
});
