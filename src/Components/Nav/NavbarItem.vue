<script lang="ts">
import { NavItem } from "./index"

import Vue from "vue"

export default Vue.extend({
  name: "NavbarItem",

  props: {
    item: { type: NavItem, required: true },
  },

  computed: {
    classes(): { [ker: string]: boolean } {
      const hasAction = this.item.route || this.item.href || this.item.click || this.item.divider

      return {
        active: this.item.isActive,
        divider: this.item.divider === true,
        dropdownHeader: !hasAction,
      }
    },
  },
})
</script>

<template>
  <router-link v-if="item.route"
               :to="item.route"
               active-class="active"
               tag="li">
    <a v-html="item.text" />
  </router-link>

  <li v-else-if="!item.route"
      :class="classes">
    <a v-if="item.href"
       :href="item.href"
       v-html="item.text" />

    <a v-else-if="item.click"
       @click.prevent="item.click"
       v-html="item.text"
       href />

    <span v-else
          v-html="item.text" />
  </li>
</template>
