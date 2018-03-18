<script lang="ts">
import { createPaging } from "crip-vue-bootstrap"
import Vue from "vue"

import { Competition } from "@/modules/competitions/competition"
import cmService from "@/modules/competitions/service"

const { mixin, paging: competitions } = createPaging<Competition>((paging, to) => {
  return cmService.fetchTeamCompetitions({ paging, team_id: to.params.team })
})

export default Vue.extend({
  name: "TeamCompetitions",

  mixins: [mixin],

  data: () => ({ competitions }),

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <div>TeamCompetitions.vue</div>
</template>
