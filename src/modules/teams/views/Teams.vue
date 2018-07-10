<script lang="ts">
import Vue from "vue";

import { Paging, Paginated, SortDirection } from "@/helpers/pagination";
import { teams } from "@/router/routes";
import { table } from "@/components/mixins";

import { Team } from "#/teams/models/team";
import { fetchTeams } from "#/teams/service";

import TeamCard from "#/teams/components/TeamCard.vue";

export default Vue.extend({
  name: "Teams",

  components: { TeamCard },

  mixins: [table],

  data: () => ({
    teams: [] as Team[],
    route: teams // make sure table mixin knows current route
  }),

  computed: {
    // override mixin calculated size to constant for this page.
    currentPageSize: (): number => 12
  },

  methods: {
    async fetchPage(paging: Paging) {
      const paginated = await fetchTeams({ paging });

      this.teams = paginated.items;

      return paginated.total;
    }
  }
});
</script>

<template>
  <div id="teams"
       v-loading="loading">
    <el-row type="flex"
            :gutter="20"
            class="teams-row">
      <el-col v-for="team in teams"
              :key="team.id"
              class="teams-col"
              :xl="4"
              :lg="6"
              :md="8"
              :sm="12"
              :xs="24">
        <TeamCard :team="team" />
      </el-col>
    </el-row>
    <el-row class="pagination-row">
      <el-pagination @current-change="onPageChange"
                     :current-page="currentPage"
                     layout="total, prev, pager, next"
                     :page-size="currentPageSize"
                     :total="totalItems">
      </el-pagination>
    </el-row>
  </div>
</template>

<style lang="scss">
#teams {
  margin-top: -10px;

  .teams-row {
    flex-wrap: wrap;

    .teams-col {
      margin: 10px 0;
    }
  }
}
</style>