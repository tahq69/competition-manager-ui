<script lang="ts">
import Vue from "vue";

import { createTabsMixin } from "@/components/mixins";
import * as routes from "@/router/routes";

import { Area } from "@/modules/competitions/models";

export default Vue.extend({
  name: "Area",

  mixins: [createTabsMixin(routes.competitionArea.name)],

  props: {
    cm: { type: [Number, String], required: true },
    area: { type: [Number, String], required: true }
  },

  data() {
    // Required only for routes, so we have no need to fetch data from server.
    const details = new Area({
      id: this.area,
      competition_id: this.cm
    });

    return { details };
  }
});
</script>

<template>
  <div id="area">
    <el-card class="tabs-card">
      <el-breadcrumb slot="header">
        <el-breadcrumb-item>
          <CompetitionLink :cm="cm">
            Competition
          </CompetitionLink>
        </el-breadcrumb-item>

        <el-breadcrumb-item>
          <AreasLink :cm="cm">
            Areas
          </AreasLink>
        </el-breadcrumb-item>

        <el-breadcrumb-item v-if="activeTab == routes.competitionArea.name">
          Area
        </el-breadcrumb-item>
      </el-breadcrumb>

      <el-tabs v-model="activeTab">
        <el-tab-pane :name="routes.competitionArea.name">
          <AreaLink slot="label"
                    :cm="cm"
                    :area="area"
                    tag="div">
            Area
          </AreaLink>
        </el-tab-pane>
      </el-tabs>

      <router-view></router-view>
    </el-card>
  </div>
</template>
