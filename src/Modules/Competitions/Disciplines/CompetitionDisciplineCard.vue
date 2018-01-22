<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import Card from "@/Components/Card"
import { createCompetitionDiscipline } from "@/Router/Routes"
import { Id, Next } from "@/types"

import { DisciplineAuth } from "./Auth"
import { Discipline } from "./Discipline"

export default Vue.extend({
  name: "CompetitionDisciplineCard",

  mixins: [Card],

  props: {
    cm: { type: [Number, String], required: true },
    create: { type: Boolean },
    discipline: { type: Discipline },
  },

  data() {
    return {
      canEdit: false,
    }
  },

  computed: {
    newDiscipline(): Location {
      return {
        ...createCompetitionDiscipline,
        params: { cm: this.cm.toString() },
      }
    },
  },

  async created() {
    this.log = this.$logger.component(this)
    if (this.create) return
    this.canEdit = await DisciplineAuth.canEdit(this.discipline.id, this.cm)
  },
})
</script>

<template>
  <div class="discipline-card card mt-3 mb-3"
       :style="{height: elHeight}">

    <div class="card-body">
      <h5 v-if="!create"
          class="card-title">{{ discipline.title }}</h5>
      <h6 v-if="!create"
          class="card-subtitle mb-2 text-muted">{{ discipline.short }}</h6>

      <router-link v-else
                    :to="newDiscipline"
                    title="Add new discipline"
                    class="btn btn-lg btn-block">
        <i class="fa fa-plus-square-o fa-2x"></i>
      </router-link>

      <router-link v-if="!create"
                   :to="discipline.routes.show"
                   class="btn btn-primary">
        Details
      </router-link>

      <router-link v-if="canEdit && !create"
                  :to="discipline.routes.edit"
                  class="btn btn-light">
        {{ $t("competitions.discipline_badge_edit") }}
        <i class="fa fa-pencil-square-o"></i>
      </router-link>
    </div>
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

