<script lang="ts">
import Vue from "vue";

import Card from "@/components/cards/card";

import { DisciplineAuth } from "#/competitions/disciplines/auth";
import CreateDisciplineBtn from "#/competitions/components/CreateDisciplineBtn.vue";

export default Vue.extend({
  name: "CreateCompetitionDisciplineCard",

  components: { CreateDisciplineBtn },

  mixins: [Card],

  props: {
    cm: { type: [Number, String], required: true }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <CreateDisciplineBtn :cm="cm"
                       :style="{ height: elHeight }"
                       tag="div"
                       class="discipline-create-card card my-3">
    <div class="card-body">
      <i class="far fa-plus-square fa-2x"></i>
    </div>
  </CreateDisciplineBtn>
</template>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";

.discipline-create-card {
  &:hover {
    background-color: $gray-100;
    cursor: pointer;
  }

  .card-body {
    text-align: center;
  }
}
</style>
