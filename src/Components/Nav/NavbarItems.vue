<template>
  <ul>
    <template v-for="item in items">
      <navbar-item v-if="!item.items" :item="item"/>
      <navbar-group
          v-else
          :item="item.parent"
          :items="item.items"
      />
    </template>
  </ul>
</template>

<script lang="ts">
  export default {
    name: 'navbarItems',

    props: {
      items: {'type': Array, 'default': () => []}
    }
  }
</script>