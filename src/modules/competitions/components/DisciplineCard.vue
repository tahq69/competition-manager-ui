<script lang="ts">
import Vue from "vue";

import { Discipline } from "#/competitions/models/discipline";
import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "CompetitionDisciplineCard",

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
  <DisciplineLink :cm="cm"
                  :discipline="discipline.id"
                  class="discipline-card"
                  tooltip=""
                  tag="div">
    <el-card shadow="hover">
      <h4 slot="header"
          class="card-header">
        {{ discipline.title }}
      </h4>

      <h5 class="card-subheader">
        {{ discipline.short }}
      </h5>

      <ManageDisciplineLink :cm="cm"
                            :discipline="discipline.id"
                            class="card-edit-link"
                            type="primary"
                            icon="edit"
                            button
                            circle
                            mini />
    </el-card>
  </DisciplineLink>
</template>

<style lang="scss">
.discipline-card {
  cursor: pointer;
  position: relative;
  height: 100%;

  .el-card {
    height: 100%;
  }

  .card-header {
    margin: 0;
  }

  .card-subheader {
    margin-top: 0;
  }

  .card-edit-link {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
}
</style>
