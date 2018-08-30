import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { manageCmDetailsRoute } from "#/competitions/routes";
import { canEditCompetition } from "#/competitions/auth";

export default Vue.extend({
  name: "ManageCompetitionLink",

  mixins: [link, visibility],

  props: {
    cm: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return manageCmDetailsRoute({ cm: this.cm });
    }
  },

  methods: {
    async checkVisibility() {
      return await canEditCompetition({ cm: this.cm });
    }
  },

  watch: {
    cm: "__checkVisibility"
  }
});
