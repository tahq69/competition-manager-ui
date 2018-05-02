<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import Card from "@/components/cards/card";
import Btn from "@/components/Btn.vue";
import { Id, Next } from "@/typings";

import DisciplineBtn from "#/competitions/components/DisciplineBtn.vue";

import { Discipline } from "../../models/discipline";
import { DisciplineAuth } from "../auth";

import { createCmDisciplineRoute, manageCmDisciplineRoute } from "../routes";

export default Vue.extend({
  name: "CompetitionDisciplineCard",

  components: { DisciplineBtn, Btn },

  mixins: [Card],

  props: {
    cm: { type: [Number, String], required: true },
    create: { type: Boolean },
    discipline: { type: Discipline }
  },

  data: () => ({ canEdit: false }),

  computed: {
    newDiscipline(): Location {
      return createCmDisciplineRoute({ cm: this.cm });
    },

    manageCmDisciplineRoute(): Location {
      return manageCmDisciplineRoute({
        cm: this.cm,
        discipline: this.discipline.id
      });
    }
  },

  created() {
    this.log = this.$logger.component(this);

    if (this.create) return;

    DisciplineAuth.canEdit(this.discipline.id, this.cm).then(
      canEdit => (this.canEdit = canEdit)
    );
  }
});
</script>

<template>
  <div class="discipline-card card mt-3 mb-3"
       :style="{height: elHeight}">

    <div class="card-body">
      <h5 v-if="!create"
          class="card-title">{{ discipline.title }}</h5>
      <h6 v-if="!create"
          class="card-subtitle mb-2 text-muted">{{ discipline.short }}</h6>

      <router-link v-else
                   :to="newDiscipline"
                   title="Add new discipline"
                   class="btn btn-lg btn-block">
        <i class="far fa-plus-square fa-2x"></i>
      </router-link>

      <DisciplineBtn v-if="!create"
                     :cm="cm"
                     :discipline="discipline.id"
                     class="btn btn-primary" />

      <Btn v-if="canEdit && !create"
           :to="manageCmDisciplineRoute"
           btn="primary"
           icon="fas fa-edit" />
    </div>
  </div>
</template>

<style lang="scss">
.discipline-card {
  position: relative;
}
</style>
