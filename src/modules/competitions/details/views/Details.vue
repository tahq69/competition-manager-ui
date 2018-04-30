<script lang="ts">
import Vue from "vue";

import { Next } from "@/typings";
import { Competition } from "@/modules/competitions/models/competition";
import cmService from "@/modules/competitions/service";

export default Vue.extend({
  name: "CompetitionDetails",

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

    <li class="list-group-item"
        v-if="competition.cooperation">
      <h6 class="text-muted">Cooperation</h6>
      <div>{{ competition.cooperation }}</div>
    </li>

    <li class="list-group-item"
        v-if="competition.invitation">
      <h6 class="text-muted">Invitation</h6>
      <div>{{ competition.invitation }}</div>
    </li>

    <li class="list-group-item"
        v-if="competition.program">
      <h6 class="text-muted">Program</h6>
      <div>{{ competition.program }}</div>
    </li>

    <li class="list-group-item"
        v-if="competition.rules">
      <h6 class="text-muted">Rules</h6>
      <div>{{ competition.rules }}</div>
    </li>

    <li class="list-group-item"
        v-if="competition.ambulance">
      <h6 class="text-muted">Ambulance</h6>
      <div>{{ competition.ambulance }}</div>
    </li>

    <li class="list-group-item"
        v-if="competition.prizes">
      <h6 class="text-muted">Prizes</h6>
      <div>{{ competition.prizes }}</div>
    </li>

    <li class="list-group-item"
        v-if="competition.equipment">
      <h6 class="text-muted">Equipment</h6>
      <div>{{ competition.equipment }}</div>
    </li>

    <li class="list-group-item"
        v-if="competition.price">
      <h6 class="text-muted">Price</h6>
      <div>{{ competition.price }}</div>
    </li>

  </ul>
</template>
