<script lang="ts">
import Vue from "vue";

import Card from "@/components/cards/card";
import EditBtn from "@/components/EditBtn.vue";

import { TeamAuth } from "../auth";
import { Team } from "../models/team";

import TeamLink from "../links/TeamLink.vue";

import { manageTeamRoute } from "../routes";

export default Vue.extend({
  name: "TeamCard",

  components: { EditBtn, TeamLink },

  mixins: [Card],

  props: {
    team: { type: Team, required: true }
  },

  data: () => ({ canEdit: false }),

  methods: {
    manageTeamRoute: (team: Team) => manageTeamRoute({ team: team.id })
  },

  async created() {
    this.log = this.$logger.component(this);
    this.canEdit = await TeamAuth.canEdit({ team: this.team.id });
  }
});
</script>

<template>
  <div :id="`team-${team.id}`"
       class="card team-card mt-3 mb-3"
       :style="{height: elHeight}">
    <img :src="team.logo"
         alt="avatar"
         class="card-img-top img-fluid">

    <div class="card-body">
      <h5 class="card-title">{{ team.name }}</h5>
      <div class="card-text">
        <!-- TODO: Card with image -->
      </div>

      <TeamLink :team="team.id"
                class="btn btn-primary">
        {{ team.short }}
      </TeamLink>

      <EditBtn v-if="canEdit"
               :to="manageTeamRoute(team)" />
    </div>
  </div>
</template>

<style lang="scss">
.team-card {
  position: relative;

  label {
    display: block;
  }
}
</style>
