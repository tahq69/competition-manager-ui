<script lang="ts">
import Vue from "vue";

import ImageCard from "@/components/cards/ImageCard.vue";

import { Team } from "#/teams/models/team";

export default Vue.extend({
  name: "TeamCard",

  components: { ImageCard },
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
    <ImageCard>
      <img :src="team.logo"
           alt="avatar"
           slot="image">
      <h4 class="card-header">
        {{ team.name }}
      </h4>

      <h5 class="card-subheader">
        {{ team.short }}
      </h5>

      <ManageTeamLink :team="team.id"
                      class="card-edit-link"
                      title="Edit team details">
        <el-button type="primary"
                   icon="el-icon-edit"
                   size="mini"
                   circle />
      </ManageTeamLink>
    </ImageCard>
  </TeamLink>
</template>

<style lang="scss">
.team-card {
  cursor: pointer;
  height: 100%;

  .el-card {
    height: 100%;
  }
}
</style>
