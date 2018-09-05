<script lang="ts">
import Vue from "vue";

import visibility from "@/components/mixins/visibility";

import { Area } from "@/modules/competitions/models";
import { canCreateArea } from "@/modules/competitions/areas/auth";
import { fetchAreas } from "@/modules/competitions/areas/service";
import { areaRoute } from "@/modules/competitions/areas/routes";
import { FetchAreasPayload } from "@/modules/competitions/areas/typings";

import CreateAreaCard from "@/modules/competitions/components/CreateAreaCard.vue";
import AreaCard from "@/modules/competitions/components/AreaCard.vue";

export default Vue.extend({
  name: "Areas",

  components: { AreaCard, CreateAreaCard },

  props: {
    cm: { type: [Number, String], required: true }
  },

  data: () => ({
    loading: true,
    areas: [] as Area[],
    sizes: {
      xl: 4,
      lg: 6,
      md: 8,
      sm: 12,
      xs: 24
    }
  }),

  methods: {
    async fetchData() {
      this.loading = true;

      const payload: FetchAreasPayload = { competition_id: this.cm };
      this.areas = await fetchAreas(payload);

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
  <el-row v-loading="loading"
          :gutter="20"
          type="flex"
          class="area-row">
    <el-col v-for="area in areas"
            :key="area.id"
            v-bind="sizes"
            class="area-col">
      <AreaCard :area="area" />
    </el-col>
    <el-col class="area-col"
            v-bind="sizes">
      <CreateAreaCard :cm="cm" />
    </el-col>
  </el-row>
</template>
