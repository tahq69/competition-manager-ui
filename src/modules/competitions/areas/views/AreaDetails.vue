<script lang="ts">
import Vue from "vue";

import { Area } from "@/modules/competitions/models";
import { fetchArea } from "@/modules/competitions/areas/service";

export default Vue.extend({
  name: "AreaDetails",

  props: {
    cm: { type: [Number, String], required: true },
    area: { type: [Number, String], required: true }
  },

  data: () => ({
    details: {} as Area,
    loading: true
  }),

  methods: {
    async fetchData() {
      this.loading = true;

      this.details = await fetchArea({
        competition_id: this.cm,
        id: this.area
      });

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
  <div v-loading="loading"
       class="area-details">
    <ManageAreaLink :cm="cm"
                    :area="area"
                    style="float: right"
                    type="primary"
                    icon="edit"
                    button
                    circle
                    mini />
    <h2>{{ details.title }}</h2>
    <div class="card-text"
         v-html="details.description"></div>
  </div>
</template>
