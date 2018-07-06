<script lang="ts">
import Vue from "vue";

import { Paging, Paginated, SortDirection } from "@/helpers/pagination";
import { teams } from "@/router/routes";

import { Team } from "#/teams/models/team";
import teamService from "#/teams/service";

import TeamCard from "#/teams/components/TeamCard.vue";

export default Vue.extend({
  name: "Teams",

  components: { TeamCard },

  props: {
    page: { type: [String, Number], required: true },
    sort: { type: String, required: true },
    direction: { type: String, required: true }
  },

  data: () => ({
    loading: false,
    totalItems: 1000000,
    teams: [] as Team[]
  }),

  computed: {
    currentPage(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.page.toString()) || 1;
    }
  },

  methods: {
    currentChange(page: string) {
      // trigger route change when users updates pagination.
      this.$router.push({
        name: teams.name,
        params: { page, sort: this.sort, direction: this.direction }
      });
    },

    async fetchPage() {
      this.loading = true;

      const page = this.currentPage;
      const direction = this.direction as SortDirection;
      const paging = new Paging(page, 12, this.sort, direction);
      const paginated = await teamService.fetchTeams({ paging });

      this.teams = paginated.items;
      this.totalItems = paginated.total;
      this.loading = false;
    }
  },

  created() {
    this.log = this.$logger.component(this);

    // fetch data on component initial load.
    this.fetchPage();

    // update when page/sort/direction is changed.
    this.$watch(
      () => [this.page, this.sort, this.direction].join(),
      () => this.fetchPage()
    );
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
      <el-pagination @current-change="currentChange"
                     :current-page="currentPage"
                     layout="total, prev, pager, next"
                     :page-size="12"
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

  .pagination-row {
    text-align: center;
    padding: 15px 0;
  }
}
</style>