<script lang="ts">
import Vue from "vue"

import { Next } from "@/types"

import { Discipline } from "./Discipline"
import disciplineService from "./Service"


export default Vue.extend({
  name: "DisciplineDetails",

  beforeRouteEnter(to, from, next: Next<any>) {
    disciplineService
      .fetchDiscipline({ competition_id: to.params.cm, id: to.params.discipline })
      .then(details => next(vm => vm.setDetails(details)))
  },

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true },
  },

  data() {
    return {
      details: {} as Discipline,
    }
  },

  methods: {
    setDetails(details: Discipline) {
      this.details = details
    },
  },
})
</script>

<template>
  <div id="discipline-details"
        :class="`discipline discipline-${discipline}`">
    <h2 class="card-title">{{ details.title }} <small class="text-muted">{{ details.short }}</small></h2>
    <h3 class="card-title">{{ details.type }}</h3>

    <!--<div><strong>Game type</strong>: <div v-html="details.game_type"></div></div>-->
    <div class="card-text" v-html="details.description"></div>
  </div>
</template>

