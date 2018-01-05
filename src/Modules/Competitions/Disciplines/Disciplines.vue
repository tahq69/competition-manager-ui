<script lang="ts">
import Vue from "vue"

import { Next } from "@/types"

import { DisciplineAuth } from "./Auth"
import { Discipline } from "./Discipline"
import disciplineService from "./Service"

import DisciplineBadge from "./DisciplineBadge.vue"

interface IData {
  disciplines: Discipline[]
}

export default Vue.extend({
  name: "Disciplines",

  components: { DisciplineBadge },

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { competition_id: to.params.competition_id }
    disciplineService
      .fetchDisciplines(payload)
      .then(disciplines => next(vm => vm.setDisciplines(disciplines)))
  },

  data(): IData {
    return {
      disciplines: [],
    }
  },

  computed: {
    canCreate(): boolean {
      return DisciplineAuth.canCreate(this.$route.params.competition_id)
    },
  },

  methods: {
    setDisciplines(disciplines: Discipline[]): void {
      this.disciplines = disciplines
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

    <CCol v-if="canCreate"
          :sm="6">
      <DisciplineBadge :create="true" />
    </CCol>
  </CRow>
</template>

<style lang="scss">
#manage-competition-disciplines {
  padding-top: 15px;
}
</style>

