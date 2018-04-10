<script lang="ts">
import Vue from "vue";

import { Next } from "@/typings";

import ManageDisciplineBtn from "#/competitions/components/ManageDisciplineBtn.vue";

import { Discipline } from "../../models/discipline";
import { DisciplineAuth } from "../auth";
import disciplineService from "../service";

export default Vue.extend({
  name: "DisciplineDetails",

  components: { ManageDisciplineBtn },

  beforeRouteEnter(to, from, next: Next<any>) {
    disciplineService
      .fetchDiscipline({
        competition_id: to.params.cm,
        id: to.params.discipline
      })
      .then(details => next(vm => vm.setDetails(details)));
  },

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true }
  },

  data: () => ({
    details: {} as Discipline,
    canEdit: false
  }),

  methods: {
    setDetails(details: Discipline) {
      this.details = details;
    }
  },

  async created() {
    this.canEdit = await DisciplineAuth.canEdit(this.discipline, this.cm);
  }
});
</script>

<template>
  <div id="discipline-details"
       :class="`discipline discipline-${discipline}`">

    <h2 class="card-title">{{ details.title }}
      <small class="text-muted">{{ details.short }}</small>
    </h2>
    <h3 class="card-title">{{ details.type }}</h3>

    <!--<div><strong>Game type</strong>: <div v-html="details.game_type"></div></div>-->
    <div class="card-text"
         v-html="details.description"></div>

    <ManageDisciplineBtn :cm="cm"
                         :discipline="discipline"
                         btn="primary">
      Edit
    </ManageDisciplineBtn>
  </div>
</template>

<style lang="scss">
.discipline {
  position: relative;

  .btn-edit {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
