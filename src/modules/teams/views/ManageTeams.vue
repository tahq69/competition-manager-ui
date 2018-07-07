<script lang="ts">
import Vue from "vue";

import { Id } from "@/typings";
import { SortDirection, Paging } from "@/helpers/pagination";
import { manageTeams } from "@/router/routes";

import { Team } from "#/teams/models/team";
import teamService from "#/teams/service";

import CreateTeamBtn from "#/teams/components/CreateTeamBtn.vue";
import ManageTeamBtn from "#/teams/components/ManageTeamBtn.vue";
import ManageTeamMembersBtn from "#/teams/components/ManageTeamMembersBtn.vue";

export default Vue.extend({
  name: "ManageTeams",

  components: { CreateTeamBtn, ManageTeamBtn, ManageTeamMembersBtn },

  props: {
    page: { type: [String, Number], required: true },
    pageSize: { type: [String, Number], required: true },
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
    },

    currentPageSize(): number {
      // convert route string parameter to number for el-pagination.
      return parseInt(this.pageSize.toString()) || 10;
    }
  },

  methods: {
    currentChange(page: string) {
      // trigger route change when users updates pagination.
      this.$router.push({
        name: manageTeams.name,
        params: { page, sort: this.sort, direction: this.direction }
      });
    },

    async fetchPage() {
      this.loading = true;
      
      const page = this.currentPage;
      const pageSize = this.currentPageSize;
      const direction = this.direction as SortDirection;
      const paging = new Paging(page, pageSize, this.sort, direction);
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

    // update when page/pageSize/sort/direction is changed.
    this.$watch(
      () => [this.page, this.sort, this.direction, this.pageSize].join(),
      () => this.fetchPage()
    );
  }
});
</script>

<template>
  <CGrid id="manage-teams"
         :paging="teams">
    <span slot="title">{{ $t('teams.manage_teams_grid_title') }}</span>

    <span slot="actions">
      <CreateTeamBtn btn="light"
                     icon>
        {{ $t('teams.manage_teams_grid_head_create_new') }}
      </CreateTeamBtn>
    </span>

    <table class="table table-hover">
      <thead>
        <tr>
          <CGridHeader :paging="teams"
                       column="id"
                       :title="$t('teams.manage_teams_grid_head_id_title')">
            {{ $t('teams.manage_teams_grid_head_id_text') }}
          </CGridHeader>

          <CGridHeader :paging="teams"
                       column="name"
                       :title="$t('teams.manage_teams_grid_head_name_title')">
            {{ $t('teams.manage_teams_grid_head_name_text') }}
          </CGridHeader>

          <CGridHeader :paging="teams"
                       column="short"
                       :title="$t('teams.manage_teams_grid_head_short_title')">
            {{ $t('teams.manage_teams_grid_head_short_text') }}
          </CGridHeader>
        </tr>
      </thead>
      <tbody>
        <template v-for="team in teams">
          <tr @click="teams.select(team)"
              :class="teams.classes(team)"
              :key="team.id">
            <td>{{ team.id }}</td>
            <td>
              {{ team.name }}&nbsp;
              <ManageTeamBtn :team="team.id"
                             :title="$t('teams.manage_teams_grid_btn_edit_title')"
                             badge
                             icon>
                {{ $t('teams.manage_teams_grid_btn_edit_text') }}
              </ManageTeamBtn>&nbsp;

              <ManageTeamMembersBtn :team="team.id"
                                    :title="$t('teams.manage_teams_grid_btn_members_title')"
                                    badge
                                    icon>
                {{ $t('teams.manage_teams_grid_btn_members_text') }}
              </ManageTeamMembersBtn>
            </td>
            <td>{{ team.short }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </CGrid>
</template>
