<script lang="ts">
import Vue from "vue";

import Card from "@/components/cards/card";

import DisciplineBtn from "#/competitions/components/DisciplineBtn.vue";
import ManageDisciplineBtn from "#/competitions/components/ManageDisciplineBtn.vue";
import { Discipline } from "#/competitions/models/discipline";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "CompetitionDisciplineCard",

  components: { DisciplineBtn, ManageDisciplineBtn },

  mixins: [Card],

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: Discipline }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <DisciplineBtn :cm="cm"
                 :discipline="discipline.id"
                 :style="{ height: elHeight }"
                 tag="div"
                 class="discipline-card card my-3">
    <div class="card-body">
      <h5 class="card-title">{{ discipline.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ discipline.short }}</h6>

      <ManageDisciplineBtn :cm="cm"
                           :discipline="discipline.id"
                           title="Edit competition discipline details"
                           btn="light"
                           class="btn-edit"
                           icon />
    </div>
  </DisciplineBtn>
</template>

<style lang="scss">
/*@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";

.discipline-card {
  position: relative;

  &:hover {
    background-color: $gray-100;
    cursor: pointer;
  }

  .btn-edit {
    position: absolute;
    right: $card-spacer-y;
    top: $card-spacer-x;
  }
}*/
</style>
