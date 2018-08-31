<script lang="ts">
import Vue from "vue";

import { Area } from "@/modules/competitions/models";
import { fetchAreas } from "@/modules/competitions/areas/service";
import { areaRoute } from "@/modules/competitions/areas/routes";

export default Vue.extend({
  name: "Areas",

  data: () => ({
    loading: true,
    areas: [] as Area[]
  }),

  props: {
    cm: { type: [Number, String], required: true }
  },

  methods: {
    async fetchData() {
      this.loading = true;

      const areas = await fetchAreas({
        competition_id: this.cm
      });

      this.areas = areas;
      this.loading = false;
    },

    onCurrentChange(area: Area) {
      this.$router.push(areaRoute({ cm: this.cm, area: area.id }));
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchData();
  }
});
</script>

<template>
  <div id="areas"
       v-loading="loading">
    <el-table :data="areas"
              highlight-current-row
              @current-change="onCurrentChange">
      <el-table-column prop="nr"
                       width="80"
                       :label="$t('areas.areas_grid_head_nr')">
      </el-table-column>

      <el-table-column prop="title"
                       :label="$t('areas.areas_grid_head_title')">
      </el-table-column>

      <el-table-column prop="type"
                       :label="$t('areas.areas_grid_head_type')">
        <template slot-scope="area">
          {{ area.row.type }}
        </template>
      </el-table-column>

      <!-- TODO: if can manage, show options
          <el-table-column fixed="right"
                         label="Operations"
                         width="120">
          <template slot-scope="competition">
            <CompetitionLink :cm="competition.row.id"
                             mini
                             circle
                             button
                             icon="view"
                             tooltip="View competition details" />
            />
          </template>
        </el-table-column> -->
    </el-table>
  </div>
</template>

<style lang="scss">
.el-table--enable-row-hover .el-table__row {
  cursor: pointer;
}
</style>
