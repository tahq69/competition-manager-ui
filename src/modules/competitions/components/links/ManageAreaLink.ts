import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { canManageArea } from "@/modules/competitions/areas/auth";
import { manageAreaRoute } from "@/modules/competitions/areas/routes";

export default Vue.extend({
  name: "ManageAreaLink",

  mixins: [link, visibility],

  props: {
    cm: { type: [String, Number], required: true },
    area: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return manageAreaRoute({ cm: this.cm, area: this.area });
    }
  },

  methods: {
    async checkVisibility(): Promise<boolean> {
      return await canManageArea(this.cm, this.area);
    }
  }
});
