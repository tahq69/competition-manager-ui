<script lang="ts">
import Vue from "vue";

import { Team } from "#/teams/models/team";

import TeamLink from "#/teams/components/TeamLink.vue";
import ManageTeamLink from "#/teams/components/ManageTeamLink.vue";

export default Vue.extend({
  name: "TeamCard",

  components: { TeamLink, ManageTeamLink },

  props: {
    team: { type: Team, required: true }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <TeamLink :team="team.id"
            class="team-card"
            tag="div">

    <el-card shadow="hover"
             :body-style="{ padding: '0px' }">

      <img :src="team.logo"
           alt="avatar"
           class="card-img">

      <div class="card-body">
        <h4 class="card-header">
          {{ team.name }}
        </h4>

        <h5 class="card-subheader">
          {{ team.short }}
        </h5>
      </div>

      <ManageTeamLink :team="team.id"
                      class="card-edit-link"
                      title="Edit team details">
        <el-button type="primary"
                   icon="el-icon-edit"
                   size="mini"
                   circle />
      </ManageTeamLink>
    </el-card>
  </TeamLink>
</template>

<style lang="scss">
.team-card {
  position: relative;
  height: 100%;

  .el-card {
    height: 100%;
  }

  .card-img {
    width: 100%;
    display: block;
  }

  .card-body {
    padding: 16px;

    .card-header {
      margin: 0;
    }

    .card-subheader {
      margin-top: 0;
    }
  }

  .card-edit-link {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
}
</style>
