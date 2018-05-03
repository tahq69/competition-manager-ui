<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Submit"
});
</script>

<template>
  <button type="submit"
          class="btn btn-primary crip-submit">
    <slot>
      <!-- default slot -->
    </slot>
  </button>
</template>
