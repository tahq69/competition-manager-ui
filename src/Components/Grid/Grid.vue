<script lang="ts">
import Vue from "vue"

import Panel from "@/Components/Panel/Panel.vue"

import Pagination from "./Pagination.vue"
import Paging from "./Paging"

export default Vue.extend({
  name: "Grid",

  components: { Panel, Pagination },

  props: {
    hideHeader: { type: Boolean, default: () => false },
    paging: { type: Paging, required: true },
  },
})
</script>

<template>
  <!--v-loading="paging.loading"-->
  <panel class="col-md-12"
         :hide-header="hideHeader">
    <span slot="title">
      <slot name="title"></slot>
    </span>
    <span slot="actions">
      <slot name="actions"></slot>
    </span>

    <div slot="pre"
         class="grid-placeholder table-responsive">
      <slot></slot>
    </div>

    <pagination :paging="paging"></pagination>
  </panel>
</template>

<style>
.panel-body .pagination,
.grid-placeholder .table {
  margin: 0;
}
</style>
