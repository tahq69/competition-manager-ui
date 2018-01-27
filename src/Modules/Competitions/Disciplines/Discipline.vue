<script lang="ts">
import Vue from "vue"

import CardActions from "@/Components/Cards/CardActions.vue"
import { Next } from "@/types"

import CompetitionLink from "../Links/CompetitionLink.vue"
import DisciplineLink from "../Links/DisciplineLink.vue"
import DisciplinesLink from "../Links/DisciplinesLink.vue"
import GroupsLink from "../Links/GroupsLink.vue"

import { Discipline } from "./Discipline"

export default Vue.extend({
  name: "Discipline",

  components: { CardActions, CompetitionLink, DisciplineLink, DisciplinesLink, GroupsLink },

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true },
  },

  data() {
    // Required only for routes, so we have no need to fetch data from server.
    const details = new Discipline({
      id: this.discipline,
      competition_id: this.cm,
    })

    return {
      details,
    }
  },
})
</script>

<template>
  <div id="discipline"
       class="crip-card card discipline mb-3"
       :class="`discipline-${discipline}`">
    <div class="card-header">

      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <DisciplineLink :cm="cm" :discipline="discipline" class="nav-link" />
        </li>

        <li class="nav-item">
          <GroupsLink :cm="cm" :discipline="discipline" class="nav-link" />
        </li>
      </ul><!-- /.card-header-tabs -->

      <CardActions>
        <CompetitionLink :cm="cm" :action="true" />
        <DisciplinesLink :cm="cm" :action="true" />
      </CardActions>

    </div><!-- /.card-header -->

     <div class="card-body">
      <router-view></router-view>
     </div>

  </div>
</template>
