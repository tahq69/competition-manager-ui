<script lang="ts">
import Vue from "vue";
import { Group, DimensionType } from "@/modules/competitions/models";

export default Vue.extend({
  name: "GroupShortText",

  props: {
    group: { type: Group, required: false }
  },

  computed: {
    typeText(): string {
      return this.group.type === DimensionType.Age ? "y" : "Kg";
    },

    typeLongText(): string {
      return this.group.type === DimensionType.Age ? "years" : "Kg";
    },

    timeText(): string {
      let s = this.group.time;
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
    },

    range(): string {
      return `Starting from ${this.group.min} until ${this.group.max} ${
        this.typeLongText
      }`;
    },

    details(): string {
      return `${this.group.rounds} rounds by ${this.timeText} minutes`;
    }
  }
});
</script>

<template>
  <el-tooltip v-if="group"
              effect="light"
              :open-delay="500">
    <div slot="content">
      {{ group.title }}<br/> {{ range }}<br/> {{ details }}
    </div>

    <span>
      {{group.short}} {{group.min}}-{{group.max}}{{typeText}} {{group.rounds}} &times;
      {{timeText}}min
    </span>
  </el-tooltip>
</template>
