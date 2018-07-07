<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Btn from "@/components/Btn.vue";
import { visibility } from "@/components/mixins";

import { manageTeamsRoute } from "#/teams/routes";
import { TeamAuth } from "#/teams/auth";

export default Vue.extend({
  name: "ManageTeamsButton",

  components: { Btn },

  mixins: [visibility],

  props: {
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
       :tag="tag"
       :exact="exact"
       :badge="badge"
       :badge-color="badgeColor"
       :btn="btn"
       :btn-outline="btnOutline"
       :btn-block="btnBlock"
       :btn-size="btnSize"
       :arrow="arrow"
       :icon="icon ? 'fas fa-list' : ''">
    <slot>
      <!-- default slot -->
    </slot>
  </Btn>
</template>
