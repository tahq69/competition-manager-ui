<script lang="ts">
import Vue from "vue";

import { visibility } from "@/components/mixins";
import { canCreateArea } from "@/modules/competitions/areas/auth";

export default Vue.extend({
  name: "CreateAreaCard",

  mixins: [visibility],

  props: {
    cm: { type: [Number, String], required: true }
  },

  methods: {
    async checkVisibility() {
      return await canCreateArea(this.cm);
    }
  }
});
</script>

<template>
  <CreateAreaLink v-if="isVisible"
                  :cm="cm"
                  tag="div"
                  class="area-create-card">
    <el-card shadow="hover">
      <i class="el-icon-plus"></i>
    </el-card>
  </CreateAreaLink>
</template>

<style lang="scss">
.area-create-card {
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
