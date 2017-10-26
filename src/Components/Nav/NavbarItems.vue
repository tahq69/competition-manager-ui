<template>
  <ul>
    <template v-for="item in items">
      <navbar-item v-if="!item.items" :item="item" :key="item.key"/>
      <navbar-group
          v-else
          :item="item.parent"
          :items="item.items"
          :key="item.key"
      />
    </template>
  </ul>
</template>

<script lang="ts">
export default {
  name: "navbarItems",

  props: {
    items: { type: Array, default: () => [] },
  },
}
</script>