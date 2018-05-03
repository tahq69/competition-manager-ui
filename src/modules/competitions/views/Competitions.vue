<script lang="ts">
import { createPaging } from "crip-vue-bootstrap";
import Vue from "vue";

import CardWrapper from "@/components/cards/card-wrapper";

import { Competition } from "../models/competition";
import cmService from "../service";

import CompetitionCard from "./CompetitionCard.vue";

const { mixin, paging: competitions } = createPaging<Competition>(
  paging => cmService.fetchCompetitions({ paging }),
  { perPage: 9, sortBy: "organization_date" }
);

export default Vue.extend({
  name: "Competitions",

  components: { CompetitionCard },

  mixins: [mixin, CardWrapper],

  data() {
    return {
      competitions
    };
  }
});
</script>

<template>
  <div id="competitions">
    <CRow>
      <CCol v-for="competition in competitions.items"
            :key="competition.id"
            :lg="4"
            :md="6"
            :sm="6"
            :xs="12">
        <CompetitionCard :competition="competition"
                         :height="maxHeight"
                         @dimensions="setupHeight"
                         title="View competition details" />
      </CCol>
    </CRow>
    <CRow>
      <CCol class="mx-auto">
        <CPagination :paging="competitions" />
      </CCol>
    </CRow>
  </div>
</template>

<style lang="scss">
#competitions {
  margin-top: -1rem;
}
</style>
