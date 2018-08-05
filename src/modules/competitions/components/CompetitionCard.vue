<script lang="ts">
import Vue from "vue";

import { Competition } from "#/competitions/models/competition";

export default Vue.extend({
  name: "CompetitionCard",

  props: {
    competition: { type: Competition, required: true }
  }
});
</script>

<template>
  <CompetitionLink :cm="competition.id"
                   class="competition-card"
                   tag="div">
    <el-card shadow="hover">
      <h4 slot="header"
          class="card-header">
        {{ competition.title }}
      </h4>

      <h5 class="card-subheader">
        {{ competition.subtitle }}
      </h5>
      <el-row>
        <el-col :span="8">Date:</el-col>
        <el-col :span="16">{{ competition.organization_date | formatDateTime }}</el-col>
      </el-row>
      <el-row v-if="competition.judge_name">
        <el-col :span="8">Judge:</el-col>
        <el-col :span="16">{{ competition.judge_name }}</el-col>
      </el-row>
      <ManageCompetitionLink :cm="competition.id"
                             class="card-edit-link"
                             title="Edit competition details"
                             type="primary"
                             icon="edit"
                             button
                             mini
                             circle />
    </el-card>
  </CompetitionLink>
</template>

<style lang="scss">
.competition-card {
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
