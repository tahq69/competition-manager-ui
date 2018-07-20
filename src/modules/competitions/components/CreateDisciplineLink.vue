<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { createCmDisciplineRoute } from "#/competitions/disciplines/routes";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "CreateDisciplineBtn",

  mixins: [link, visibility],

  props: {
    cm: { type: [String, Number], required: true }
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
  <router-link :to="to"
               :tag="tag"
               :exact="exact"
               :class="elClass">
    <i v-if="icon"
       :class="_icon"></i>
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
