<script lang="ts">
import Vue from "vue"

import Card from "@/Components/Cards/Card"
import EditBtn from "@/Components/EditBtn.vue"

import { TeamAuth } from "./Auth"
import { Team } from "./Team"

export default Vue.extend({
  name: "TeamCard",

  components: { EditBtn },

  mixins: [Card],

  props: {
    team: { type: Team, required: true },
  },

  data() {
    return {
      canEdit: false,
    }
  },

  async created() {
    this.canEdit = await TeamAuth.canEdit({ team: this.team.id })
  },
})
</script>

<template>
  <div
    :id="`team-${team.id}`"
    class="card team-card mt-3 mb-3"
    :style="{height: elHeight}"
  >
    <div class="card-body">
      <h5 class="card-title">{{ team.title }}</h5>
      <div class="card-text">
        TODO: Card with image
      </div>

      <TeamLink :cm="team.id" class="btn btn-primary">
        {{ team.short }}
      </TeamLink>

      <EditBtn v-if="canEdit" :to="team.routes.edit" />
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
