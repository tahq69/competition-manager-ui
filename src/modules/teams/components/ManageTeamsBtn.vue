<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { watchVisibility } from "@/components/auth/mixins";

import { manageTeamsRoute } from "#/teams/routes";
import { TeamAuth } from "#/teams/auth";

export default Vue.extend({
  name: "ManageTeamsButton",

  components: { Btn },

  mixins: [watchVisibility],

  props: {
    exact: { type: Boolean, default: true },
    btn: { type: String },
    badge: { type: Boolean, default: false },
    arrow: { type: String, default: "" }
  },

  computed: {
    to: (): Location => manageTeamsRoute()
  },

  methods: {
    async checkVisibility() {
      return await TeamAuth.canCreate();
    }
  }
});
</script>

<template>
  <Btn v-if="isVisible"
       :to="to"
       :exact="exact"
       :btn="btn"
       :badge="badge"
       :arrow="arrow"
       icon="fas fa-list">
    <slot>
      <!-- default slot -->
    </slot>
  </Btn>
</template>
