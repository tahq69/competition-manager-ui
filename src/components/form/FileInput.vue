<script lang="ts">
import Vue from "vue";

import FilesysIframe from "@/components/form/FilesysIframe.vue";

export default Vue.extend({
  name: "FileInput",

  components: { FilesysIframe },

  props: {
    id: { type: String, required: false },
    name: { type: String, required: true },
    type: { type: String, required: false },
    value: { type: String, required: true },
    size: { type: String, required: false }
  },

  data: () => ({ isManagerVisible: false }),

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <div class="file-input">
    <el-input :id="id"
              :name="name"
              :value="value"
              @input="$emit('input', $event.target.value)"
              disabled>
      <el-button slot="append"
                 @click="isManagerVisible = !isManagerVisible"
                 icon="el-icon-search">Select file</el-button>
    </el-input>

    <el-dialog :visible.sync="isManagerVisible"
               custom-class="file-input-dialog"
               :show-close="true"
               title="CRIP File Manager"
               width="90%">
      <FilesysIframe :size="size"
                     :type="type"
                     @input="$emit('input', $event), isManagerVisible = false" />
    </el-dialog>
  </div>
</template>

<style lang="scss">
.file-input-dialog {
  .el-dialog__header {
    background-color: #f5f6f7;
  }

  .el-dialog__body {
    padding: 0;
  }
}
</style>
