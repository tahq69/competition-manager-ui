<script lang="ts">
import Vue from "vue";

import CardActions from "@/components/cards/CardActions.vue";
import { Next } from "@/typings";

import CompetitionBtn from "#/competitions/components/CompetitionBtn.vue";
import DisciplineLink from "#/competitions/components/DisciplineLink.vue";
import DisciplinesBtn from "#/competitions/components/DisciplinesBtn.vue";
import GroupsBtn from "#/competitions/components/GroupsBtn.vue";

import { Discipline } from "../../models/discipline";

export default Vue.extend({
  name: "Discipline",

  components: {
    CardActions,
    CompetitionBtn,
    DisciplineLink,
    DisciplinesBtn,
    GroupsBtn
  },

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

    return {
      details
    };
  }
});
</script>

<template>
  <div id="discipline"
       class="crip-card card discipline mb-3"
       :class="`discipline-${discipline}`">
    <div class="card-header">

      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <DisciplineLink :cm="cm"
                          :discipline="discipline"
                          class="nav-link">
            Discipline
          </DisciplineLink>
        </li>

        <li class="nav-item">
          <GroupsBtn :cm="cm"
                     :discipline="discipline"
                     class="nav-link">
            Groups
          </GroupsBtn>
        </li>
      </ul>
      <!-- /.card-header-tabs -->

      <CardActions>
        <CompetitionBtn :cm="cm"
                        btn="light"
                        arrow="left">
          Competition
        </CompetitionBtn>

        <DisciplinesBtn :cm="cm"
                        btn="light"
                        arrow="left">
          Disciplines
        </DisciplinesBtn>
      </CardActions>

    </div>
    <!-- /.card-header -->

    <div class="card-body">
      <router-view></router-view>
    </div>

  </div>
</template>
