<template>
  <!--v-loading="paging.loading"-->
  <panel class="col-md-12" :hide-header="hideHeader">
    <span slot="title"><slot name="title"></slot></span>
    <span slot="actions"><slot name="actions"></slot></span>

    <div slot="pre" class="grid-placeholder table-responsive">
      <slot></slot>
    </div>

    <pagination :paging="paging"></pagination>
  </panel>
</template>

<script lang="ts">
import Panel from "@/Components/Panel/Panel.vue"

import Pagination from "./Pagination.vue"
import Paging from "./Paging"

export default {
  name: "Grid",

  components: { Panel, Pagination },

  props: {
    paging: { type: Paging, required: true },
    hideHeader: { type: Boolean, default: () => false },
  },

  mounted() {
    this.$logger.component(this)
  },
}
</script>

<style>
.panel-body .pagination,
.grid-placeholder .table {
  margin: 0;
}
</style>
