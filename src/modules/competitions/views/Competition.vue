<script lang="ts">
import Vue from "vue";

import { createTabsMixin } from "@/components/mixins";
import { competitionDetails } from "@/router/routes";

import { Competition } from "#/competitions/models/competition";

export default Vue.extend({
  name: "Competition",

  mixins: [createTabsMixin(competitionDetails.name)],

  props: {
    cm: { type: [Number, String], required: true }
  },

  computed: {
    competition(): Competition {
      return new Competition({ id: this.cm });
    }
  }
});
</script>

<template>
  <div id="competition">
    <el-card class="tabs-card">
      <el-breadcrumb slot="header">
        <el-breadcrumb-item>
          <CompetitionLink :cm="cm">
            Competition
          </CompetitionLink>
        </el-breadcrumb-item>

        <template v-if="activeTab != defaultRoute">
          <el-breadcrumb-item v-if="$route.name == routes.competitionDisciplines.name">
            <DisciplinesLink :cm="cm">
              {{ $t("competitions.competition_disciplines_tab") }}
            </DisciplinesLink>
          </el-breadcrumb-item>

          <el-breadcrumb-item v-if="$route.name == routes.competitionAreas.name">
            {{ $t("competitions.competition_areas_tab") }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>

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

        <el-tab-pane :name="routes.competitionAreas.name">
          <AreasLink slot="label"
                     :cm="cm"
                     tag="div">
            {{ $t("competitions.competition_areas_tab") }}
          </AreasLink>
        </el-tab-pane>
      </el-tabs>

      <router-view></router-view>
    </el-card>
  </div>
</template>
