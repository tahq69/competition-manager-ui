<script lang="ts">
import Vue from "vue";

import { DisciplineAuth } from "#/competitions/disciplines/auth";

export default Vue.extend({
  name: "CreateCompetitionDisciplineCard",

  props: {
    cm: { type: [Number, String], required: true }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <CreateDisciplineLink :cm="cm"
                        tag="div"
                        class="discipline-create-card">
    <el-card shadow="hover">
      <i class="el-icon-plus"></i>
    </el-card>
  </CreateDisciplineLink>
</template>

<style lang="scss">
.discipline-create-card {
  cursor: pointer;
  position: relative;
  height: 100%;

  .el-card,
  .el-card__body {
    height: 100%;
  }

  .el-card__body {
    padding: 0;
    text-align: center;
  }

  .el-icon-plus {
    margin-top: 25%;
    transform: translateY(-50%);
    font-size: 50px;
    font-weight: 900;
  }
}
</style>
