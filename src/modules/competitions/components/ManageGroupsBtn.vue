<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { visibility } from "@/components/mixins";

import { manageCmGroupsRoute } from "#/competitions/groups/routes";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "ManageCompetitionDisciplineGroupsButton",

  components: { Btn },

  mixins: [visibility],

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    tag: { type: String, default: "a" },
    exact: { type: Boolean, default: true },
    badge: { type: Boolean, default: false },
    badgeColor: { type: String, default: "light" },
    btnOutline: { type: Boolean, default: false },
    btnBlock: { type: Boolean, default: false },
    btn: { type: String, default: "" },
    btnSize: { type: String, default: "sm" },
    arrow: { type: String, default: "" },
    icon: { type: Boolean, default: false }
  },

  computed: {
    to(): Location {
      return manageCmGroupsRoute({ cm: this.cm, discipline: this.discipline });
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
       :tag="tag"
       :exact="exact"
       :badge="badge"
       :badge-color="badgeColor"
       :btn="btn"
       :btn-outline="btnOutline"
       :btn-block="btnBlock"
       :btn-size="btnSize"
       :arrow="arrow"
       :icon="icon ? 'fas fa-edit' : ''">
    <slot>
      <!-- default slot -->
    </slot>
  </Btn>
</template>
