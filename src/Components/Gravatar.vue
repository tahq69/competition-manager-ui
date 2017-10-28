<template>
  <div class="gravatar">
    <img :src="url" alt="avatar" class="img-responsive img-thumbnail">
  </div>
</template>

<script lang="ts">
export default {
  name: "Gravatar",

  props: {
    md5: { type: String, required: true },
    size: { type: Number, default: () => 80 },
    default: { type: String, default: () => "mm" },
    domain: { type: String, default: () => "http://www.gravatar.com" },
  },

  computed: {
    url() {
      let picture = `&d=${this.default}`
      if (this.default === "gravatar") picture = ""

      return `${this.domain}/avatar/${this.md5}?s=${this.size}${picture}`
    },
  },
}
</script>

