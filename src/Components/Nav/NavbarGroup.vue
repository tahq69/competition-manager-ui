<script lang="ts">
import { NavGroup } from "./index"
import NavbarItems from "./NavbarItems.vue"

import Vue from "vue"

export default Vue.extend({
  name: "NavbarGroup",

  components: { NavbarItems },

  props: {
    item: { type: Object, required: true },
    items: { type: Array, default: () => [] },
  },

  computed: {
    hasItems(): boolean {
      return this.items.length > 0
    },
  },
})
</script>

<template>
  <li>
    <a href
       class="dropdown-toggle"
       data-toggle="dropdown">
      {{ item.text }}
      <span class="caret"></span>
    </a>
    <navbar-items v-if="hasItems"
                  :items="items"
                  class="dropdown-menu" />
  </li>
</template>
