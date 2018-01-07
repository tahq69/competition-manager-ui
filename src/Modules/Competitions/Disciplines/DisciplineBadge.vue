<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import { createCompetitionDiscipline } from "@/Router/Routes"
import { Id, Next } from "@/types"

import { DisciplineAuth } from "./Auth"
import { Discipline } from "./Discipline"

export default Vue.extend({
  name: "DisciplinesBadge",

  props: {
    discipline: { type: Discipline },
    create: { type: Boolean },
  },

  computed: {
    canEdit(): boolean {
      if (this.create) return false
      return DisciplineAuth.canEdit(this.discipline.id, this.discipline.competition_id)
    },

    newDiscipline(): Location {
      return {
        ...createCompetitionDiscipline,
        params: {
          competition_id: this.$route.params.competition_id,
        },
      }
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
      <router-link v-if="!create"
                   :to="discipline.routes.show">
        {{ discipline.title }}
      </router-link>
      <router-link v-else
                   :to="newDiscipline">
        <i class="fa fa-plus-square-o fa-2x"></i>
      </router-link>
    </h4>
    <small v-if="!create">{{ discipline.short }}</small>
    <small v-else>Create new discipline</small>
  </div>
</template>

<style lang="scss">
.discipline-badge {
  display: block;
  margin-bottom: 15px;
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

