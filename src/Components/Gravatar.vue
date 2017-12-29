<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Gravatar",

  props: {
    default: { type: String, default: () => "mm" },
    domain: { type: String, default: () => "http://www.gravatar.com" },
    md5: { type: String, required: true },
    size: { type: Number, default: () => 80 },
  },

  computed: {
    url(): string {
      let picture = `&d=${this.default}`
      if (this.default === "gravatar") picture = ""

      return `${this.domain}/avatar/${this.md5}?s=${this.size}${picture}`
    },
  },
})
</script>

<template>
  <div class="gravatar">
    <img :src="url"
         alt="avatar"
         class="img-responsive img-thumbnail">
  </div>
</template>
