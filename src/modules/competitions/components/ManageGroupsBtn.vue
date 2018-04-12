<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { watchVisibility } from "@/components/auth/mixins";

import { manageCmGroupsRoute } from "#/competitions/groups/routes";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "ManageCompetitionDisciplineGroupsButton",

  components: { Btn },

  mixins: [watchVisibility],

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    badge: { type: Boolean, default: false },
    btn: { type: String }
  },

  computed: {
    to(): Location {
      const cm = this.cm;
      const discipline = this.discipline;
      return manageCmGroupsRoute({ cm, discipline });
    }
  },

  methods: {
    async checkVisibility() {
      return await DisciplineAuth.canEdit(this.discipline, this.cm);
    }
  }
});
</script>

<template>
  <Btn v-if="isVisible"
       :to="to"
       :badge="badge"
       :btn="btn"
       icon="fas fa-edit">
    <slot />
  </Btn>
</template>
