<script lang="ts">
import Vue from "vue"

import CardWrapper from "@/Components/CardWrapper"
import { Next } from "@/types"

import { DisciplineAuth } from "./Auth"
import { Discipline } from "./Discipline"
import disciplineService from "./Service"

import DisciplineCard from "./CompetitionDisciplineCard.vue"

export default Vue.extend({
  name: "CompetitionDisciplines",

  mixins: [CardWrapper],

  components: { DisciplineCard },

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
  <CRow id="disciplines">
    <CCol v-for="discipline in disciplines"
          :key="discipline.id"
          :sm="6">
      <DisciplineCard :cm="cm"
                      :discipline="discipline"
                      :height="maxHeight"
                      @dimensions="setupHeight" />
    </CCol>

    <CCol v-if="canCreate"
          :sm="6">
      <DisciplineCard :cm="cm"
                      :create="true" />
    </CCol>
  </CRow>
</template>

<style lang="scss">
#disciplines {
  margin-top: -1rem;
  margin-bottom: -1rem;
}
</style>

