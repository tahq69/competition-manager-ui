<script lang="ts">
import Vue from "vue";

import * as routes from "@/router/routes";

import { Competition } from "#/competitions/models/competition";

import AreasLink from "#/competitions/components/AreasLink.vue";
import CompetitionLink from "#/competitions/components/CompetitionLink.vue";
import DisciplinesLink from "#/competitions/components/DisciplinesLink.vue";

export default Vue.extend({
  name: "Competition",

  components: {
    AreasLink,
    CompetitionLink,
    DisciplinesLink
  },

  props: {
    cm: { type: [Number, String], required: true }
  },

  data: () => ({
    routes,
    activeTab: routes.competitionDetails.name
  }),

  computed: {
    competition(): Competition {
      return new Competition({ id: this.cm });
    }
  },

  created() {
    this.log = this.$logger.component(this);

    this.activeTab = this.$route.name || routes.competitionDetails.name;
  }
});
</script>

<template>
  <div id="competition">
    <el-tabs v-model="activeTab">
      <el-tab-pane :name="routes.competitionDetails.name">
        <CompetitionLink slot="label"
                         :cm="cm"
                         tag="div">
          {{ $t("competitions.competition_details_tab") }}
        </CompetitionLink>
      </el-tab-pane>

      <el-tab-pane :name="routes.competitionDisciplines.name">
        <DisciplinesLink slot="label"
                         :cm="cm"
                         tag="div">
          {{ $t("competitions.competition_disciplines_tab") }}
        </DisciplinesLink>
      </el-tab-pane>

      <el-tab-pane :name="routes.competitionDisciplines.name">
        <AreasLink slot="label"
                   :cm="cm"
                   tag="div">
          {{ $t("competitions.competition_areas_tab") }}
        </AreasLink>
      </el-tab-pane>
    </el-tabs>

    <router-view></router-view>
  </div>
</template>
