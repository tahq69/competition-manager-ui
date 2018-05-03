<script lang="ts">
import Vue from "vue";

import Card from "@/components/cards/card";
import Btn from "@/components/Btn.vue";

import TeamBtn from "#/teams/components/TeamBtn.vue";
import ManageTeamBtn from "#/teams/components/ManageTeamBtn.vue";
import { Team } from "#/teams/models/team";

export default Vue.extend({
  name: "TeamCard",

  components: { Btn, TeamBtn, ManageTeamBtn },

  mixins: [Card],

  props: {
    team: { type: Team, required: true }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <TeamBtn :team="team.id"
           :id="`team-${team.id}`"
           tag="div"
           class="card team-card mt-3 mb-3"
           :style="{height: elHeight}">
    <img :src="team.logo"
         alt="avatar"
         class="card-img-top img-fluid">

    <div class="card-body">
      <h5 class="card-title">{{ team.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ team.short }}</h6>
      <ManageTeamBtn :team="team.id"
                     btn="light"
                     icon
                     class="btn-edit"
                     title="Edit team details" />
    </div>
  </TeamBtn>
</template>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";

.team-card {
  position: relative;

  &:hover {
    background-color: $gray-100;
    cursor: pointer;
  }

  .btn-edit {
    position: absolute;
    right: $card-spacer-y;
    top: $card-spacer-x;
  }
}
</style>
