<script lang="ts">
import Vue from "vue";

import { Area } from "@/modules/competitions/models";

export default Vue.extend({
  name: "AreaCard",

  props: {
    area: { type: Area, required: true }
  }
});
</script>

<template>
  <AreaLink :cm="area.competition_id"
            :area="area.id"
            class="area-card"
            tag="div">
    <el-card shadow="hover">
      <h4 slot="header"
          class="card-header">
        {{ area.title }}
      </h4>

      <h5 class="card-subheader">
        {{ area.type }}
      </h5>

      <ManageAreaLink :cm="area.competition_id"
                      :area="area.id"
                      class="card-edit-link"
                      type="primary"
                      icon="edit"
                      button
                      circle
                      mini />
    </el-card>
  </AreaLink>
</template>

<style lang="scss">
.area-card {
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
