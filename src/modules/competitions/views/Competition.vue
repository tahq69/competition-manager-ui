<script lang="ts">
import Vue from "vue";

import { Competition } from "#/competitions/models/competition";
import AreasBtn from "#/competitions/components/AreasBtn.vue";
import CompetitionBtn from "#/competitions/components/CompetitionBtn.vue";
import DisciplinesBtn from "#/competitions/components/DisciplinesBtn.vue";

export default Vue.extend({
  name: "Competition",

  components: {
    AreasBtn,
    DisciplinesBtn,
    CompetitionBtn
  },

  props: {
    cm: { type: [Number, String], required: true }
  },

  computed: {
    competition(): Competition {
      return new Competition({ id: this.cm });
    }
  },

  mounted() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <div id="manage-competition"
       class="card crip-card">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <CompetitionBtn :cm="cm"
                          class="nav-link">
            {{ $t("competitions.competition_details_tab") }}
          </CompetitionBtn>
        </li>

        <li class="nav-item">
          <DisciplinesBtn :cm="cm"
                          class="nav-link">
            {{ $t("competitions.competition_disciplines_tab") }}
          </DisciplinesBtn>
        </li>

        <li class="nav-item">
          <AreasBtn :cm="cm"
                    class="nav-link">
            {{ $t("competitions.competition_areas_tab") }}
          </AreasBtn>
        </li>
      </ul>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <router-view></router-view>
    </div>
  </div>
</template>
