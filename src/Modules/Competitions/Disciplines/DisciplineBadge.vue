<script lang="ts">
import Vue from "vue"

import { middleware, roles } from "@/Components/Auth"
import { Next } from "@/types"

import { Discipline } from "./Discipline"

export default Vue.extend({
  name: "DisciplinesBadge",

  props: {
    discipline: { type: Discipline, required: true },
  },

  computed: {
    canEdit(): boolean {
      return middleware.hasAnyRole(roles.competitions)
    },
  },
})
</script>

<template>
  <div class="img-thumbnail discipline-badge">
    <router-link v-if="canEdit"
                 :to="discipline.routes.edit"
                 class="badge-edit btn btn-xs btn-link">
      {{ $t("competitions.discipline_badge_edit") }}
      <i class="fa fa-pencil-square-o"></i>
    </router-link>

    <h4>
      <router-link :to="discipline.routes.show">
        {{ discipline.title }}
      </router-link>
    </h4>
    <small>{{ discipline.short }}</small>
  </div>
</template>

<style lang="scss">
.discipline-badge {
  display: block;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;

  .badge-edit {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>

