<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import Card from "@/components/cards/card"
import EditBtn from "@/components/EditBtn.vue"
import { createCompetitionDiscipline } from "@/router/routes"
import { Id, Next } from "@/types"

import DisciplineLink from "../../links/DisciplineLink.vue"

import { DisciplineAuth } from "../auth"
import { Discipline } from "../discipline"

export default Vue.extend({
  name: "CompetitionDisciplineCard",

  components: { DisciplineLink, EditBtn },

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
  <div class="discipline-card card mt-3 mb-3" :style="{height: elHeight}">

    <div class="card-body">
      <h5 v-if="!create" class="card-title">{{ discipline.title }}</h5>
      <h6 v-if="!create" class="card-subtitle mb-2 text-muted">{{ discipline.short }}</h6>

      <router-link
        v-else
        :to="newDiscipline"
        title="Add new discipline"
        class="btn btn-lg btn-block"
      ><i class="fa fa-plus-square-o fa-2x"></i></router-link>

      <DisciplineLink
        v-if="!create"
        :cm="cm" :discipline="discipline.id"
        class="btn btn-primary"
      />

      <EditBtn v-if="canEdit && !create" :to="discipline.routes.edit" />
    </div>
  </div>
</template>

<style lang="scss">
.discipline-card {
  position: relative;
}
</style>
