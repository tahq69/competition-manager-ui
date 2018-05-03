<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { watchVisibility } from "@/components/auth/mixins";

import { createCmDisciplineRoute } from "#/competitions/disciplines/routes";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "CreateCompetitionDisciplineButton",

  components: { Btn },

  mixins: [watchVisibility],

  props: {
    cm: { type: [String, Number], required: true },
    tag: { type: String, default: "a" },
    icon: { type: Boolean, default: false }
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
  }
});
</script>

<template>
  <Btn v-if="isVisible"
       :to="to"
       :tag="tag"
       :icon="icon ? 'far fa-plus-square' : ''">
    <slot>
      <!-- default slot -->
    </slot>
  </Btn>
</template>
