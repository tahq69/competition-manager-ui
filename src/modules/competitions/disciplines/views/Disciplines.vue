<script lang="ts">
import Vue from "vue";

import visibility from "@/components/mixins/visibility";

import { Discipline } from "#/competitions/models/discipline";
import { DisciplineAuth } from "#/competitions/disciplines/auth";
import { fetchDisciplines } from "#/competitions/disciplines/service";

import CreateDisciplineCard from "#/competitions/components/CreateDisciplineCard.vue";
import DisciplineCard from "#/competitions/components/DisciplineCard.vue";

export default Vue.extend({
  name: "CompetitionDisciplines",

  components: { CreateDisciplineCard, DisciplineCard },

  mixins: [visibility],

  props: {
    cm: { type: [Number, String], required: true }
  },

  data: () => ({
    loading: true,
    isCreateVisible: false,
    disciplines: [] as Discipline[]
  }),

  methods: {
    async fetchData() {
      this.loading = true;
      const payload = { competition_id: this.cm };
      this.disciplines = await fetchDisciplines(payload);
      this.loading = false;
    },

    async checkVisibility() {
      this.isCreateVisible = await DisciplineAuth.canCreate(this.cm);
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchData();
  }
});
</script>

<template>
  <el-row v-loading="loading"
          :gutter="20"
          type="flex"
          class="disciplines-row">
    <el-col v-for="discipline in disciplines"
            :key="discipline.id"
            class="discipline-col"
            :xl="4"
            :lg="6"
            :md="8"
            :sm="12"
            :xs="24">
      <DisciplineCard :cm="cm"
                      :discipline="discipline"
                      title="View discipline details" />
    </el-col>
    <el-col v-if="isCreateVisible"
            class="discipline-col"
            :xl="4"
            :lg="6"
            :md="8"
            :sm="12"
            :xs="24">
      <CreateDisciplineCard :cm="cm"
                            title="Create new discipline" />
    </el-col>
  </el-row>
</template>
