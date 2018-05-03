<script lang="ts">
import Vue from "vue";

import { Next } from "@/typings";

import cmService from "#/competitions/service";
import { Competition } from "#/competitions/models/competition";
import ManageCompetitionBtn from "#/competitions/components/ManageCompetitionBtn.vue";

import DetailsDescription from "./DetailsDescription.vue";

export default Vue.extend({
  name: "CompetitionDetails",

  components: { DetailsDescription, ManageCompetitionBtn },

  props: {
    cm: { type: [Number, String], required: true }
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    cmService
      .fetchCompetition({ id: to.params.cm })
      .then(competition => next(vm => vm.init(competition)));
  },

  data: () => ({
    competition: new Competition({})
  }),

  methods: {
    init(competition: Competition) {
      this.competition = competition;
    }
  }
});
</script>

<template>
  <div :class="`competition-details competition-details-${cm}`">
    <ul id="competition-details"
        class="list-group list-group-flush mb-0">

      <li class="list-group-item">
        <!-- TODO: Add judge details component if info is provided -->
        <h4>{{ competition.title }}</h4>
        <h5 class="text-muted">{{ competition.subtitle }}</h5>

        <CRow>
          <CCol>Registration available until:</CCol>
          <CCol>{{ competition.registration_till | formatDateTime }}</CCol>
        </CRow>

        <CRow>
          <CCol>Competition starts at:</CCol>
          <CCol>{{ competition.organization_date | formatDateTime }}</CCol>
        </CRow>
      </li>

      <DetailsDescription title="Cooperation"
                          :content="competition.cooperation" />

      <DetailsDescription title="Invitation"
                          :content="competition.invitation" />

      <DetailsDescription title="Program"
                          :content="competition.program" />

      <DetailsDescription title="Rules"
                          :content="competition.rules" />

      <DetailsDescription title="Ambulance"
                          :content="competition.ambulance" />

      <DetailsDescription title="Prizes"
                          :content="competition.prizes" />

      <DetailsDescription title="Equipment"
                          :content="competition.equipment" />

      <DetailsDescription title="Price"
                          :content="competition.price" />
    </ul>

    <ManageCompetitionBtn :cm="cm"
                          btn="light"
                          class="btn-edit"
                          title="Edit competition details" />
  </div>
</template>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";

.competition-details {
  position: relative;

  .btn-edit {
    position: absolute;
    right: 0;
    top: 0;
    z-index: $zindex-dropdown;
  }
}
</style>
