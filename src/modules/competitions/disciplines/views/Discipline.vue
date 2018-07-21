<script lang="ts">
import Vue from "vue";

import { createTabsMixin } from "@/components/mixins";
import { competitionDiscipline } from "@/router/routes";

import { Discipline } from "#/competitions/models/discipline";

import CompetitionLink from "#/competitions/components/CompetitionLink.vue";
import DisciplineLink from "#/competitions/components/DisciplineLink.vue";
import DisciplinesLink from "#/competitions/components/DisciplinesLink.vue";
import GroupsLink from "#/competitions/components/GroupsLink.vue";

export default Vue.extend({
  name: "Discipline",

  components: {
    CompetitionLink,
    DisciplineLink,
    DisciplinesLink,
    GroupsLink
  },

  mixins: [createTabsMixin(competitionDiscipline.name)],

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true }
  },

  data() {
    // Required only for routes, so we have no need to fetch data from server.
    const details = new Discipline({
      id: this.discipline,
      competition_id: this.cm
    });

    return { details };
  }
});
</script>

<template>
  <div id="discipline">
    <el-card class="breadcrumb-card">
      <el-breadcrumb>
        <el-breadcrumb-item>
          <CompetitionLink :cm="cm">
            Competition
          </CompetitionLink>
        </el-breadcrumb-item>

        <el-breadcrumb-item>
          <DisciplinesLink :cm="cm">
            Disciplines
          </DisciplinesLink>
        </el-breadcrumb-item>

        <el-breadcrumb-item v-if="activeTab == routes.competitionDiscipline.name">
          Discipline
        </el-breadcrumb-item>

        <el-breadcrumb-item v-if="activeTab == routes.competitionDisciplineGroups.name">
          Groups
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <el-card class="tabs-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane :name="routes.competitionDiscipline.name">
          <DisciplineLink slot="label"
                          :cm="cm"
                          :discipline="discipline"
                          tag="div">
            Discipline
          </DisciplineLink>
        </el-tab-pane>

        <el-tab-pane :name="routes.competitionDisciplineGroups.name">
          <GroupsLink slot="label"
                      :cm="cm"
                      :discipline="discipline"
                      tag="div">
            Groups
          </GroupsLink>
        </el-tab-pane>
      </el-tabs>

      <router-view></router-view>
    </el-card>
  </div>
</template>
