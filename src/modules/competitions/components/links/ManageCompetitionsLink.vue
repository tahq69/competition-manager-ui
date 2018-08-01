<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { link, visibility } from "@/components/mixins";

import { manageCompetitionsRoute } from "#/competitions/routes";
import { canManageCompetitions } from "#/competitions/auth";

export default Vue.extend({
  name: "ManageCompetitionsLink",

  mixins: [link, visibility],

  computed: {
    to(): Location {
      return manageCompetitionsRoute();
    }
  },

  methods: {
    async checkVisibility() {
      return await canManageCompetitions();
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
       :class="_icon"></i>
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
