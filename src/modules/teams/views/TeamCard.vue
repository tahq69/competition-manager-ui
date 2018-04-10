<script lang="ts">
import Vue from "vue";

import Card from "@/components/cards/card";
import Btn from "@/components/Btn.vue";

import TeamBtn from "#/teams/components/TeamBtn.vue";

import { TeamAuth } from "../auth";
import { Team } from "../models/team";

import { manageTeamRoute } from "../routes";

export default Vue.extend({
  name: "TeamCard",

  components: { Btn, TeamBtn },

  mixins: [Card],

  props: {
    team: { type: Team, required: true }
  },

  data: () => ({ canEdit: false }),

  methods: {
    manageTeamRoute: (team: Team) => manageTeamRoute({ team: team.id })
  },

  created() {
    this.log = this.$logger.component(this);

    TeamAuth.canEdit({ team: this.team.id }).then(
      canEdit => (this.canEdit = canEdit)
    );
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

      <TeamBtn :team="team.id"
               class="btn btn-primary">
        {{ team.short }}
      </TeamBtn>

      <Btn v-if="canEdit"
           :to="manageTeamRoute(team)"
           btn="primary"
           icon="fas fa-edit" />
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
