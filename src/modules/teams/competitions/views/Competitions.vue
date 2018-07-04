<script lang="ts">
import Vue from "vue";

import { teamCompetitions } from "@/router/routes";
import { Paging, SortDirection } from "@/helpers";

import cmService from "#/competitions/service";
import { Competition } from "#/competitions/models/competition";
import { cmDetailsRoute } from "#/competitions/details/routes";

import ManageCompetitionBtn from "#/competitions/components/ManageCompetitionBtn.vue";

export default Vue.extend({
  name: "TeamCompetitions",

  components: { ManageCompetitionBtn },

  props: {
    team: { type: [String, Number], required: true },
    page: { type: [String, Number], required: true },
    perPage: { type: [String, Number], required: true },
    sort: { type: String, required: true },
    direction: { type: String, required: true }
  },

  data: () => ({
    loading: false,
    totalItems: 1000000,
    competitions: [] as Competition[]
  }),

  computed: {
    hasCm(): boolean {
      return this.competitions.length > 0;
    },
    
    currentPage(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.page.toString()) || 1;
    },

    currentPerPage(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.perPage.toString()) || 10;
    }
  },

  methods: {
    competitionDetailsRoute(cm: Competition) {
      return cmDetailsRoute({ cm: cm.id });
    },
    
    currentChange(page: string) {
      const perPage = this.perPage.toString();

      // trigger route change when users updates pagination.
      this.$router.push({
        name: teamCompetitions.name,
        params: { page, sort: this.sort, direction: this.direction, perPage }
      });
    },

    async fetchPage() {
      this.loading = true;

      const page = this.currentPage;
      const perPage = this.currentPerPage;
      const direction = this.direction as SortDirection;
      const paging = new Paging(page, perPage, this.sort, direction);
      const payload = { paging, team_id: this.team };
      const paginated = await cmService.fetchTeamCompetitions(payload);

      this.competitions = paginated.items;
      this.totalItems = paginated.total;

      this.loading = false;
    }
  },

  created() {
    this.log = this.$logger.component(this);

    // fetch data on component initial load.
    this.fetchPage();

    // update when page/perPage/sort/direction is changed.
    this.$watch(
      () => [this.page, this.sort, this.direction, this.perPage].join(),
      () => this.fetchPage()
    );
  }
});
</script>

<template>
  <div id="team-competitions">
    <table v-if="hasCm"
           class="table table-hover mb-0">
      <thead>
        <tr>
          <CGridHeader :paging="competitions"
                       column="title"
                       title="Sort by title">
            Title
          </CGridHeader>

          <CGridHeader :paging="competitions"
                       column="judge_name"
                       title="Sort by main judge">
            Judge
          </CGridHeader>

          <CGridHeader :paging="competitions"
                       column="organization_date"
                       title="Sort by organization date">
            Organization date
          </CGridHeader>
        </tr>
      </thead>
      <tbody>
        <router-link v-for="cm in competitions"
                     :key="cm.id"
                     tag="tr"
                     :to="competitionDetailsRoute(cm)"
                     class="c-pointer">
          <td>
            <span>{{ cm.title }}</span>
            &nbsp;
            <ManageCompetitionBtn :cm="cm.id"
                                  title="Edit competition details"
                                  badge>
              Edit
            </ManageCompetitionBtn>
          </td>
          <td>{{ cm.judge_name }}</td>
          <td>{{ cm.organization_date | formatDate }}</td>
        </router-link>
      </tbody>
    </table>
    <div v-else
         class="card-body text-danger">
      This team does not have any competition.
    </div>

    <div v-if="hasCm"
         class="card-footer clearfix">
      <CPagination :paging="competitions"
                   class="float-left mb-0" />
      <CPerPage :paging="competitions"
                class="float-right" />
    </div>
  </div>
</template>
