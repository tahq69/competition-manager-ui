<script lang="ts">
import Vue from "vue";

import { Next } from "@/typings";
import { Competition } from "@/modules/competitions/models/competition";
import cmService from "@/modules/competitions/service";

import DetailsSection from "./DetailsSection.vue";

export default Vue.extend({
  name: "CompetitionDetails",

  components: { DetailsSection },

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
  <ul id="competition-details"
      class="list-group list-group-flush mb-0">

    <li class="list-group-item">
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

    <DetailsSection title="Cooperation"
                    :content="competition.cooperation" />

    <DetailsSection title="Invitation"
                    :content="competition.invitation" />

    <DetailsSection title="Program"
                    :content="competition.program" />

    <DetailsSection title="Rules"
                    :content="competition.rules" />

    <DetailsSection title="Ambulance"
                    :content="competition.ambulance" />

    <DetailsSection title="Prizes"
                    :content="competition.prizes" />

    <DetailsSection title="Equipment"
                    :content="competition.equipment" />

    <DetailsSection title="Price"
                    :content="competition.price" />
  </ul>
</template>
