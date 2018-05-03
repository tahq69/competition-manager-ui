<script lang="ts">
import Vue from "vue";

import CardWrapper from "@/components/cards/card-wrapper";
import { Next } from "@/typings";

import { Discipline } from "#/competitions/models/discipline";
import { DisciplineAuth } from "#/competitions/disciplines/auth";
import disciplineService from "#/competitions/disciplines/service";

import CreateDisciplineCard from "./CreateDisciplineCard.vue";
import DisciplineCard from "./DisciplineCard.vue";

export default Vue.extend({
  name: "CompetitionDisciplines",

  mixins: [CardWrapper],

  components: { CreateDisciplineCard, DisciplineCard },

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { competition_id: to.params.cm };
    disciplineService
      .fetchDisciplines(payload)
      .then(disciplines => next(vm => vm.init(disciplines)));
  },

  props: {
    cm: { type: [Number, String], required: true }
  },

  data: () => ({ disciplines: [] as Discipline[] }),

  methods: {
    init(disciplines: Discipline[]): void {
      this.disciplines = disciplines;
    }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <CRow id="disciplines">
    <CCol v-for="discipline in disciplines"
          :key="discipline.id"
          :sm="6">
      <DisciplineCard :cm="cm"
                      :discipline="discipline"
                      :height="maxHeight"
                      @dimensions="setupHeight"
                      title="View discipline" />
    </CCol>

    <CCol :sm="6">
      <CreateDisciplineCard :cm="cm"
                            :height="maxHeight"
                            @dimensions="setupHeight"
                            title="Create discipline for competition" />
    </CCol>
  </CRow>
</template>
