<template>
  <div v-if="isVisible">
    <div
        class="alert alert-dismissible"
        :class="[`alert-${type}`]"
    >
      <button
          type="button"
          class="close"
          @click="hide"
      >
        &times;
      </button>

      <slot/>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

const typeValues = ["success", "info", "warning", "danger"]

export default {
  name: "alert",

  mounted() {
    this.$logger.component(this)
  },

  props: {
    type: {
      type: String,
      default: () => "danger",
      validator: value => typeValues.indexOf(value) > -1,
    },

    isVisible: {
      type: Boolean,
      default: () => true,
    },
  },

  methods: {
    hide() {
      this.$emit("update:isVisible", false)
      this.$emit("hide")
    },
  },
}
</script>
