<template>
  <ul v-if="hasErrors" class="help-block crip-form-errors">
    <li v-for="error in errors" :key="error" class="text-danger">
      {{ error }}
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "formErrors",

  props: {
    errors: { type: Array, default: () => [] },
  },

  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
  },
}
</script>