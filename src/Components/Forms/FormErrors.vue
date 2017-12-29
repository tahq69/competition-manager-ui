<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "FormErrors",

  props: {
    errors: { type: Array, default: () => [] },
  },

  computed: {
    hasErrors(): boolean {
      return this.errors.length > 0
    },
  },
})
</script>

<template>
  <ul v-if="hasErrors"
      class="help-block crip-form-errors">
    <li v-for="error in errors"
        :key="error"
        class="text-danger">
      {{ error }}
    </li>
  </ul>
</template>
