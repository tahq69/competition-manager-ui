<script lang="ts">
import Vue from "vue"
import { Route } from "vue-router"

import Paging from "./Paging"

type Direction = "asc" | "desc"

export default Vue.extend({
  name: "SortableHeader",

  props: {
    column: { type: String, required: true },
    paging: { type: Paging, required: true },
  },

  computed: {
    direction(): Direction {
      return this.paging.$direction === "asc" ? "asc" : "desc"
    },

    isEnabled(): boolean {
      return this.column === this.paging.$sort
    },

    route(): Route {
      const route = JSON.parse(JSON.stringify(this.paging.route))
      let direction = "desc"

      if (this.isEnabled) {
        // Setup oposite route direction if this header is already enabled.
        direction = this.direction === "desc" ? "asc" : "desc"
      }

      if (!route.params) {
        route.params = {
          direction,
          page: this.paging.$page,
          perpage: this.paging.$perPage,
          sort: this.column,
        }
      } else {
        route.params.page = this.paging.$page
        route.params.sort = this.column
        route.params.direction = direction
        route.params.perpage = this.paging.$perPage
      }

      return route
    },
  },
})
</script>

<template>
  <th class="sort-th clearfix">
    <router-link :to="route"
                 class="sort-th-anchor">
      <slot></slot>
      <div class="pull-right"
           v-if="isEnabled">
        <span v-if="direction == 'asc'"
              class="fa fa-sort-asc"></span>
        <span v-else
              class="fa fa-sort-desc"></span>
      </div>
    </router-link>
  </th>
</template>

<style lang="scss">
table thead th.sort-th {
  padding: 0;

  .sort-th-anchor {
    padding: 8px;
    display: block;
    height: 100%;
    cursor: pointer;

    &:hover {
      background-color: rgba(200, 200, 200, 0.3);
    }
  }
}
</style>
