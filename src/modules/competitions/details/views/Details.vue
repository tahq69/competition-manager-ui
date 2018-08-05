<script lang="ts">
import Vue from "vue";

import { Next } from "@/typings";

import { fetchCompetition } from "#/competitions/service";
import { Competition } from "#/competitions/models/competition";

export default Vue.extend({
  name: "CompetitionDetails",

  props: {
    cm: { type: [Number, String], required: true }
  },

  data: () => ({
    loading: false,
    competition: new Competition({})
  }),

  methods: {
    async fetchData() {
      this.loading = true;
      this.competition = await fetchCompetition({ id: this.cm });
      this.loading = false;
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchData();
  }
});
</script>

<template>
  <div id="competition-details"
       v-loading="loading">

    <ManageCompetitionLink :cm="cm"
                           title="Edit competition details"
                           type="primary"
                           icon="edit"
                           button
                           circle
                           mini
                           style="float: right" />

    <!-- TODO: Add judge details component if info is provided -->
    <h3>{{ competition.title }}</h3>
    <h4 class="text-muted">{{ competition.subtitle }}</h4>

    <el-row>
      <el-col>Registration available until:</el-col>
      <el-col>{{ competition.registration_till | formatDateTime }}</el-col>
    </el-row>

    <el-row>
      <el-col>Competition starts at:</el-col>
      <el-col>{{ competition.organization_date | formatDateTime }}</el-col>
    </el-row>

    <div v-if="competition.cooperation">
      <h4>Cooperation</h4>
      <div v-html="competition.cooperation" />
      <hr />
    </div>

    <div v-if="competition.invitation">
      <h4>Invitation</h4>
      <div v-html="competition.invitation" />
      <hr />
    </div>

    <div v-if="competition.program">
      <h4>Program</h4>
      <div v-html="competition.program" />
      <hr />
    </div>

    <div v-if="competition.rules">
      <h4>Rules</h4>
      <div v-html="competition.rules" />
      <hr />
    </div>

    <div v-if="competition.ambulance">
      <h4>Ambulance</h4>
      <div v-html="competition.ambulance" />
      <hr />
    </div>

    <div v-if="competition.prizes">
      <h4>Prizes</h4>
      <div v-html="competition.prizes" />
      <hr />
    </div>

    <div v-if="competition.equipment">
      <h4>Equipment</h4>
      <div v-html="competition.equipment" />
      <hr />
    </div>

    <div v-if="competition.price">
      <h4>Price</h4>
      <div v-html="competition.price" />
      <hr />
    </div>
  </div>
</template>
