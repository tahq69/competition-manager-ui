<script lang="ts">
import Vue from "vue"

import { Next } from "@/types"

import { DisciplineAuth } from "./Auth"
import { Discipline } from "./Discipline"
import disciplineService from "./Service"

import DisciplineBadge from "./DisciplineBadge.vue"

export default Vue.extend({
  name: "Disciplines",

  components: { DisciplineBadge },

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { competition_id: to.params.cm }
    disciplineService
      .fetchDisciplines(payload)
      .then(disciplines => next(vm => vm.setDisciplines(disciplines)))
  },

  props: {
    cm: { type: [Number, String], required: true },
  },

  data() {
    return {
      canCreate: false,
      disciplines: [] as Discipline[],
    }
  },

  methods: {
    setDisciplines(disciplines: Discipline[]): void {
      this.disciplines = disciplines
    },
  },

  async created() {
    this.log = this.$logger.component(this)
    this.canCreate = await DisciplineAuth.canCreate(this.cm)
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

