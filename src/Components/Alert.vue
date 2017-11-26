<script lang="ts">
import Vue from "vue"

const typeValues = ["success", "info", "warning", "danger"]

export default {
  name: "Alert",

  mounted() {
    this.$logger.component(this)
  },

  props: {
    isVisible: { type: Boolean, default: () => true },
    type: {
      default: () => "danger",
      type: String,
      validator: value => typeValues.indexOf(value) > -1,
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
