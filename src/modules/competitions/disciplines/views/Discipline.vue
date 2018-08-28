<script lang="ts">
import Vue from "vue";

import { createTabsMixin } from "@/components/mixins";
import * as routes from "@/router/routes";

import { Discipline } from "@/modules/competitions/models/discipline";

export default Vue.extend({
  name: "Discipline",

  mixins: [createTabsMixin(routes.competitionDiscipline.name)],

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
  },

  computed: {
    isGroupsChildActive(): boolean {
      const rn = this.$route.name;

      return (
        rn === routes.createGroup.name ||
        rn === routes.manageGroup.name ||
        rn === routes.createCategory.name ||
        rn === routes.manageCategory.name
      );
    }
  }
});
</script>

<template>
  <div id="discipline">
    <el-card class="tabs-card">
      <el-breadcrumb slot="header">
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

        <el-breadcrumb-item v-if="activeTab == routes.competitionGroups.name">
          Groups
        </el-breadcrumb-item>

        <el-breadcrumb-item v-if="isGroupsChildActive">
          <GroupsLink :cm="cm"
                      :discipline="discipline">
            Groups
          </GroupsLink>
        </el-breadcrumb-item>

        <el-breadcrumb-item v-if="isGroupsChildActive">
          <span v-if="activeTab == routes.createGroup.name">Create group</span>
          <span v-if="activeTab == routes.manageGroup.name">Manage group</span>
          <span v-if="activeTab == routes.createCategory.name">Create category</span>
          <span v-if="activeTab == routes.manageCategory.name">Manage category</span>
        </el-breadcrumb-item>

      </el-breadcrumb>

      <el-tabs v-model="activeTab">
        <el-tab-pane :name="routes.competitionDiscipline.name">
          <DisciplineLink slot="label"
                          :cm="cm"
                          :discipline="discipline"
                          tag="div">
            Discipline
          </DisciplineLink>
        </el-tab-pane>

        <el-tab-pane :name="routes.competitionGroups.name">
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
