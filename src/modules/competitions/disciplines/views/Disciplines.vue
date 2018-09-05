<script lang="ts">
import Vue from "vue";

import visibility from "@/components/mixins/visibility";

import { Discipline } from "@/modules/competitions/models/discipline";
import { DisciplineAuth } from "@/modules/competitions/disciplines/auth";
import { fetchDisciplines } from "@/modules/competitions/disciplines/service";

import CreateDisciplineCard from "@/modules/competitions/components/CreateDisciplineCard.vue";
import DisciplineCard from "@/modules/competitions/components/DisciplineCard.vue";

export default Vue.extend({
  name: "Disciplines",

  components: { CreateDisciplineCard, DisciplineCard },

  mixins: [visibility],

  props: {
    cm: { type: [Number, String], required: true }
  },

  data: () => ({
    loading: true,
    isCreateVisible: false,
    disciplines: [] as Discipline[],
    sizes: {
      xl: 4,
      lg: 6,
      md: 8,
      sm: 12,
      xs: 24
    }
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
            v-bind="sizes"
            class="discipline-col">
      <DisciplineCard :cm="cm"
                      :discipline="discipline" />
    </el-col>
    <el-col v-if="isCreateVisible"
            v-bind="sizes"
            class="discipline-col">
      <CreateDisciplineCard :cm="cm" />
    </el-col>
  </el-row>
</template>
