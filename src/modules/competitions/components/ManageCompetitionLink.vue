<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { manageCmDetailsRoute } from "#/competitions/details/routes";
import { CompetitionAuth } from "#/competitions/auth";

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
      return await CompetitionAuth.canEdit({ cm: this.cm });
    }
  }
});
</script>

<template>
  <router-link v-if="isVisible"
               :to="to"
               :tag="tag"
               :exact="exact"
               :class="elClass">
    <i v-if="icon"
       :class="icon"></i>
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
