<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { manageCompetitions } from "@/router/routes";

import { Competition } from "../models/competition";
import competitionService from "../service";

import ManageCompetitionLink from "#/competitions/components/links/ManageCompetitionLink.vue";
import { Paging, SortDirection } from "@/helpers";

export default Vue.extend({
  name: "ManageCompetitions",

  components: { ManageCompetitionLink },

  props: {
    page: { type: [String, Number], required: true },
    pageSize: { type: [String, Number], required: true },
    sort: { type: String, required: true },
    direction: { type: String, required: true }
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
    },

    currentPageSize(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.pageSize.toString()) || 10;
    }
  },

  methods: {
    currentChange(page: string) {
      const pageSize = this.pageSize.toString();

      // trigger route change when users updates pagination.
      this.$router.push({
        name: manageCompetitions.name,
        params: { page, sort: this.sort, direction: this.direction, pageSize }
      });
    },

    async fetchPage() {
      this.loading = true;

      const page = this.currentPage;
      const pageSize = this.currentPageSize;
      const direction = this.direction as SortDirection;
      const paging = new Paging(page, pageSize, this.sort, direction);
      const payload = { paging, owned: true };
      const paginated = await competitionService.fetchCompetitions(payload);

      this.competitions = paginated.items;
      this.totalItems = paginated.total;

      this.loading = false;
    }
  },

  created() {
    this.log = this.$logger.component(this);

    // fetch data on component initial load.
    this.fetchPage();

    // update when page/pageSize/sort/direction is changed.
    this.$watch(
      () => [this.page, this.sort, this.direction, this.pageSize].join(),
      () => this.fetchPage()
    );
  }
});
</script>

<template>
  <CCol>
    <CGrid id="manage-competitions"
           :paging="competitions">
      <span slot="title">{{ $t('competitions.manage_competitions_grid_title') }}</span>

      <table class="table table-hover">
        <thead>
          <tr>
            <CGridHeader :paging="competitions"
                         column="id"
                         :title="$t('competitions.manage_competitions_grid_head_id_title')">
              {{ $t('competitions.manage_competitions_grid_head_id_text') }}
            </CGridHeader>

            <CGridHeader :paging="competitions"
                         column="title"
                         :title="$t('competitions.manage_competitions_grid_head_title_title')">
              {{ $t('competitions.manage_competitions_grid_head_title_text') }}
            </CGridHeader>

            <CGridHeader :paging="competitions"
                         column="judge_name"
                         :title="$t('competitions.manage_competitions_grid_head_judge_name_title')">
              {{ $t('competitions.manage_competitions_grid_head_judge_name_text') }}
            </CGridHeader>

            <CGridHeader :paging="competitions"
                         column="organization_date"
                         :title="$t('competitions.manage_competitions_grid_head_organization_date_title')">
              {{ $t('competitions.manage_competitions_grid_head_organization_date_text') }}
            </CGridHeader>
          </tr>
        </thead>
        <tbody>
          <template v-for="competition in competitions.items">
            <tr @click="competitions.select(competition)"
                :class="competitions.classes(competition)"
                :key="competition.id">
              <td>{{ competition.id }}</td>
              <td>
                <span>{{ competition.title }}</span>
                &nbsp;
                <ManageCompetitionLink :cm="competition.id"
                                       :title="$t('competitions.manage_competitions_grid_btn_edit_title')"
              
                                       badge
                                       icon>
                  {{ $t('competitions.manage_competitions_grid_btn_edit_text') }}
                </ManageCompetitionLink>
              </td>
              <td>{{ competition.judge_name }}</td>
              <td>{{ competition.organization_date | formatDateTime }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </CGrid>
  </CCol>
</template>
