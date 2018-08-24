<script lang="ts">
import Vue from "vue";
import { Group } from "@/modules/competitions/models";

export default Vue.extend({
  name: "GroupShortText",

  props: {
    group: { type: Group, required: true }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <span>{{group.short}} {{group.min}}-{{group.max}} {{group.typeText}} {{group.rounds}}
    x {{group.timeText}} min</span>
</template>
