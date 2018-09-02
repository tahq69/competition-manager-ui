import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { createAreaRoute } from "@/modules/competitions/areas/routes";
import { canCreateArea } from "@/modules/competitions/areas/auth";

export default Vue.extend({
  name: "CreateAreaLink",

  mixins: [link, visibility],

  props: {
    cm: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return createAreaRoute({ cm: this.cm });
    }
  },

  methods: {
    async checkVisibility(): Promise<boolean> {
      return await canCreateArea(this.cm);
    }
  },

  watch: {
    cm: "__checkVisibility"
  }
});
