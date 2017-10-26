<template>
  <router-link
      v-if="item.route"
      :to="item.route"
      active-class="active"
      tag="li"
  >
    <a v-html="item.text"/>
  </router-link>

  <li v-else-if="!item.route" :class="classes">
    <a
        v-if="item.href"
        :href="item.href"
        v-html="item.text"
        href
    />

    <a
        v-else-if="item.click"
        @click.prevent="item.click"
        v-html="item.text"
        href
    />

    <span v-else v-html="item.text"/>
  </li>
</template>

<script lang="ts">
import { NavItem } from "./index"

export default {
  name: "navbarItem",

  props: {
    item: { type: NavItem, required: true },
  },

  computed: {
    classes() {
      const hasAction =
        this.item.route ||
        this.item.href ||
        this.item.click ||
        this.item.divider

      return {
        active: this.item.isActive,
        divider: this.item.divider === true,
        "dropdown-header": !hasAction,
      }
    },
  },
}
</script>