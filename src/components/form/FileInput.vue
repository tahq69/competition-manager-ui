<script lang="ts">
import Vue from "vue";

import FilesysIframe from "./FilesysIframe.vue";

export default Vue.extend({
  name: "FileInput",

  components: { FilesysIframe },

  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
    form: { type: Object, required: true },
    id: { type: String, required: false },
    size: { type: String, required: false },
    type: { type: String, required: false },
    inputClass: { type: [String, Array, Object], required: false }
  },

  data: () => ({ isManagerVisible: false }),

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <div class="input-group crip-file-input">
    <div class="input-group-append">
      <button class="btn btn-outline-secondary"
              @click="isManagerVisible = !isManagerVisible"
              type="button">Select file</button>
    </div>

    <input type="text"
           disabled="disabled"
           :value="value"
           @input="$emit('input', $event.target.value)"
           :id="id"
           :name="name"
           :class="inputClass">

    <CFormErrors slot="feedback"
                 :errors="form.errors[name]" />

    <CModal :is-visible.sync="isManagerVisible"
            size="lg">
      <FilesysIframe :size="size"
                     :type="type"
                     @input="$emit('input', $event), isManagerVisible = false" />
    </CModal>

  </div>
</template>

<style lang="scss">
.crip-file-input .modal-body {
  padding: 0;
}
</style>
