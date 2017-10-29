<template>
  <th class="sort-th clearfix" @click="sort">
    <slot></slot>
    <div class="pull-right" v-if="isEnabled">
      <span v-if="asc" class="fa fa-sort-asc"></span>
      <span v-else class="fa fa-sort-desc"></span>
    </div>
  </th>
</template>

<script lang="ts">
import Paging from "./Paging"

export default {
  name: "SortableHeader",

  props: {
    paging: { type: Paging, required: true },
    column: { type: String, required: true },
  },

  data() {
    return {
      asc: true,
    }
  },

  computed: {
    sortDirection() {
      return this.asc ? "asc" : "desc"
    },
    isEnabled() {
      return this.column === this.paging.$sort
    },
  },

  methods: {
    toggleDirection() {
      if (this.isEnabled) {
        this.asc = !this.asc
        this.paging.setDirection(this.sortDirection)
        return true
      }

      return false
    },

    sort() {
      if (this.isEnabled) {
        return this.toggleDirection()
      }

      this.paging.setSort(this.column)
    },
  },
}
</script>

<style lang="scss">
.sort-th {
  cursor: pointer;

  &:hover {
    background-color: rgba(200, 200, 200, 0.3);
  }
}
</style>
