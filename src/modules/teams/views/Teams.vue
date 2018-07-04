<script lang="ts">
import Vue from "vue";

import CardWrapper from "@/components/cards/card-wrapper";
import { Paging, Paginated, SortDirection } from "@/helpers/pagination";
import { teams } from "@/router/routes";

import { Team } from "#/teams/models/team";
import teamService from "#/teams/service";
import TeamCard from "#/teams/views/TeamCard.vue";

export default Vue.extend({
  name: "Teams",

  components: { TeamCard },

  mixins: [CardWrapper],

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
      const paging = new Paging(page, 16, this.sort, direction);
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
  <div id="teams">
    <CRow>
      <CCol v-for="team in teams"
            :key="team.id"
            :lg="3"
            :md="4"
            :sm="6"
            :xs="12">
        <TeamCard :team="team"
                  :height="maxHeight"
                  @dimensions="setupHeight" />
      </CCol>
    </CRow>
    <CRow>
      <CCol class="mx-auto">
        <CPagination :paging="teams" />
      </CCol>
    </CRow>
  </div>
</template>
