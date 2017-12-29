<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "NavbarItems",

  props: {
    items: { type: Array, default: () => [] },
  },
})
</script>

<template>
  <ul>
    <template v-for="item in items">
      <navbar-item v-if="!item.items"
                   :item="item"
                   :key="item.key" />
      <navbar-group v-else
                    :item="item.parent"
                    :items="item.items"
                    :key="item.key" />
    </template>
  </ul>
</template>
