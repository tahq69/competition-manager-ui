import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { createCmDisciplineRoute } from "#/competitions/disciplines/routes";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "CreateDisciplineBtn",

  mixins: [link, visibility],

  props: {
    cm: { type: [String, Number], required: true },
    tooltip: { type: String, default: "Create new discipline" }
  },

  computed: {
    to(): Location {
      return createCmDisciplineRoute({ cm: this.cm });
    }
  },

  methods: {
    async checkVisibility() {
      return await DisciplineAuth.canCreate(this.cm);
    }
  },

  watch: {
    cm: "__checkVisibility"
  }
});
