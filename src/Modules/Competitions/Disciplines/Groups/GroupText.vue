<script lang="ts">
import Vue from "vue"

import { Group } from "./Group"

export default Vue.extend({
  name: "GroupText",

  props: {
    group: { type: Group, required: true },
    short: { type: Boolean, default: false },
  },

  computed: {
    type(): string {
      if (this.group.type === "AGE") return "years"
      return "Kg"
    },

    time(): string {
      let s = this.group.time
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s
    },

    min(): number {
      return this.group.min
    },

    max(): number {
      return this.group.max
    },

    rounds(): number {
      return this.group.rounds
    },

    shortText(): string {
      return `${this.group.short} ${this.min}-${this.max} ${this.type} ${
        this.rounds
      } &times; ${this.time} min`
    },

    longText(): string {
      return `${this.group.title} ${this.min} - ${this.max} ${this.type} ${
        this.rounds
      } &times; ${this.time} minutes`
    },
  },
})
</script>

<template>
  <span v-if="short" v-html="shortText" :title="longText" />
  <span v-else v-html="longText" />
</template>
