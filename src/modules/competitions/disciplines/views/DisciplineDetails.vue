<script lang="ts">
import Vue from "vue";

import { Discipline } from "@/modules/competitions/models/discipline";
import { fetchDiscipline } from "@/modules/competitions/disciplines/service";

export default Vue.extend({
  name: "DisciplineDetails",

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true }
  },

  data: () => ({
    details: {} as Discipline,
    canEdit: false,
    loading: true
  }),

  methods: {
    async fetchData() {
      this.loading = true;
      this.details = await fetchDiscipline({
        competition_id: this.cm,
        id: this.discipline
      });
      this.loading = false;
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchData();
  }
});
</script>

<template>
  <div v-loading="loading"
       id="discipline-details">

    <ManageDisciplineLink :cm="cm"
                          :discipline="discipline"
                          style="float: right"
                          type="primary"
                          icon="edit"
                          button
                          circle
                          mini />

    <h2>{{ details.title }}
      <small>{{ details.short }}</small>
    </h2>

    <h3>{{ details.type }}</h3>

    <!--<div><strong>Game type</strong>: <div v-html="details.game_type"></div></div>-->
    <div class="card-text"
         v-html="details.description"></div>
  </div>
</template>
