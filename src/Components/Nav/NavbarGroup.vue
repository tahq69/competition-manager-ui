<template>
  <li>
    <a href class="dropdown-toggle" data-toggle="dropdown">
      {{ item.text }} <span class="caret"></span>
    </a>
    <navbar-items
        v-if="hasItems"
        :items="items"
        class="dropdown-menu"
    />
  </li>
</template>

<script lang="ts">
import { NavGroup } from "./index"
import NavbarItems from "./NavbarItems.vue"

export default {
  name: "navbarGroup",

  components: { NavbarItems },

  props: {
    item: { type: Object, required: true },
    items: { type: Array, default: () => [] },
  },

  computed: {
    hasItems() {
      return this.items.length > 0
    },
  },
}
</script>