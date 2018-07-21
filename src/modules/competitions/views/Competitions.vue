<script lang="ts">
import Vue from "vue";

import { Paging, Paginated } from "@/helpers/pagination";
import { competitions } from "@/router/routes";
import { table } from "@/components/mixins";

import { Competition } from "#/competitions/models/competition";
import { fetchCompetitions } from "#/competitions/service";
import CompetitionCard from "#/competitions/components/CompetitionCard.vue";

export default Vue.extend({
  name: "Competitions",

  components: { CompetitionCard },

  mixins: [table],

  data: () => ({
    competitions: [] as Competition[],
    route: competitions // make sure table mixin knows current route
  }),

  computed: {
    // override mixin calculated size to constant for this page.
    currentPageSize: (): number => 12
  },

  methods: {
    async fetchPage(paging: Paging) {
      // owerride default sort with date for this page as there is no option for
      // use to change it.
      paging.sort = "organization_date";

      const paginated = await fetchCompetitions({ paging });

      this.competitions = paginated.items;
      return paginated.total;
    }
  }
});
</script>

<template>
  <div id="competitions"
       v-loading="loading">
    <el-row :gutter="20"
            type="flex"
            class="competitions-row">
      <el-col v-for="competition in competitions"
              :key="competition.id"
              class="competitions-col"
              :xl="4"
              :lg="6"
              :md="8"
              :sm="12"
              :xs="24">
        <CompetitionCard :competition="competition"
                         title="View competition details" />
      </el-col>
    </el-row>
    <el-row class="pagination-row">
      <el-pagination @current-change="onPageChange"
                     layout="total, prev, pager, next"
                     :current-page="currentPage"
                     :page-size="currentPageSize"
                     :total="totalItems">
      </el-pagination>
    </el-row>
  </div>
</template>

<style lang="scss">
#competitions {
  margin-top: -10px;

  .competitions-row {
    flex-wrap: wrap;

    .competitions-col {
      margin: 10px 0;
    }
  }
}
</style>
