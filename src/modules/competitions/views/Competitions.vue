<script lang="ts">
import { createPaging } from "crip-vue-bootstrap";
import Vue from "vue";

import CardWrapper from "@/components/cards/card-wrapper";
import { Paging, Paginated } from "@/helpers/pagination";
import { competitions } from "@/router/routes";

import { Competition } from "#/competitions/models/competition";
import cmService from "#/competitions/service";
import CompetitionCard from "#/competitions/components/CompetitionCard.vue";

export default Vue.extend({
  name: "Competitions",

  components: { CompetitionCard },

  mixins: [CardWrapper],

  props: {
    page: { type: [String, Number], required: true }
  },

  data: () => ({
    loading: false,
    totalItems: 1000000,
    competitions: [] as Competition[]
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
        name: competitions.name,
        params: { page }
      });
    },

    async fetchPage(page: number) {
      this.loading = true;

      const paging = new Paging(page, 8, "organization_date");
      const paginated = await cmService.fetchCompetitions({ paging });

      this.competitions = paginated.items;
      this.totalItems = paginated.total;

      this.loading = false;
    }
  },

  watch: {
    page() {
      // update when router page is changed.
      this.fetchPage(this.currentPage);
    }
  },

  created() {
    this.log = this.$logger.component(this);

    // fetch data on component initial load.
    this.fetchPage(this.currentPage);
  }
});
</script>

<template>
  <div id="competitions"
       v-loading="loading">
    <el-row :gutter="21">
      <el-col v-for="competition in competitions"
              :key="competition.id"
              :xl="4"
              :lg="6"
              :md="8"
              :sm="12"
              :xs="24">
        <CompetitionCard :competition="competition"
                         :height="maxHeight"
                         @dimensions="setupHeight"
                         title="View competition details" />
      </el-col>
    </el-row>
    <el-row class="pagination-row">
      <el-pagination @current-change="currentChange"
                     :current-page="currentPage"
                     layout="total, prev, pager, next"
                     :page-size="8"
                     :total="totalItems">
      </el-pagination>
    </el-row>
  </div>
</template>

<style lang="scss">
#competitions {
  margin-top: -10.5px;
  margin-bottom: -10.5px;

  .pagination-row {
    text-align: center;
    padding: 15px 0;
  }
}
</style>

