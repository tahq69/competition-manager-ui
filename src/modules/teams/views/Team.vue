<script lang="ts">
import Vue from "vue";

import { Next } from "@/typings";
import ImageCard from "@/components/cards/ImageCard.vue";

import { Team } from "#/teams/models/team";
import { fetchTeam } from "#/teams/service";

export default Vue.extend({
  name: "Team",

  components: { ImageCard },

  props: {
    team: { type: [Number, String], required: true }
  },

  data: () => ({
    loading: false,
    details: new Team({}),
    activeTab: "teamMembers"
  }),

  methods: {
    async fetchTeam() {
      this.loading = true;

      const payload = { id: this.team };
      this.details = await fetchTeam(payload);

      this.loading = false;
    }
  },

  created() {
    this.log = this.$logger.component(this);

    this.activeTab = this.$route.name || "teamMembers";
    this.fetchTeam();
  }
});
</script>

<template>
  <el-row id="team"
          v-loading="loading"
          :gutter="20">
    <el-col :sm="12"
            :md="8"
            :lg="6">
      <div class="card">
        <ImageCard>
          <img slot="image"
               :src="details.logo"
               alt="Team logo">

          <h4 class="card-header">{{ details.name }}</h4>
          <h5 class="card-subheader">{{ details.short }}</h5>

          <ManageTeamLink :team="details.id"
                          type="primary"
                          icon="edit"
                          button
                          circle
                          mini />

          <CreateTeamCompetitionLink :team="details.id"
                                     type="success"
                                     icon="plus"
                                     button
                                     circle
                                     mini />
        </ImageCard>
      </div>
    </el-col>

    <el-col :sm="12"
            :md="16"
            :lg="18">
      <el-tabs v-model="activeTab">
        <el-tab-pane name="teamMembers">
          <TeamLink slot="label"
                    :team="team"
                    :exact="false"
                    tag="div">
            Members
          </TeamLink>
        </el-tab-pane>
        <el-tab-pane name="teamCompetitions">
          <TeamCompetitionsLink slot="label"
                                :team="team"
                                :exact="false"
                                tag="div">
            Competitions
          </TeamCompetitionsLink>
        </el-tab-pane>
      </el-tabs>

      <router-view></router-view>
    </el-col>
  </el-row>
</template>
