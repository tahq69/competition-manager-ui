<script lang="ts">
import Vue from "vue"

import { Next } from "@/types"

import { Discipline } from "./Discipline"
import disciplineService from "./Service"

export default Vue.extend({
  name: "ManageCompetitionDiscipline",

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { competition_id: to.params.competition_id, id: to.params.id }
    disciplineService
      .fetchDiscipline(payload)
      .then(discipline => next(vm => vm.setDiscipline(discipline)))
  },

  data() {
    return {
      discipline: {} as Discipline,
    }
  },

  methods: {
    setDisciplines(discipline: Discipline): void {
      this.discipline = discipline
    },
  },

  created() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <CRow id="manage-competition-disciplines">
    <CCol v-for="discipline in disciplines"
          :key="discipline.id"
          :sm="6">
      <DisciplineBadge :discipline="discipline" />
    </CCol>
  </CRow>
</template>

<style lang="scss">
#manage-competition-disciplines {
  padding-top: 15px;
}
</style>

