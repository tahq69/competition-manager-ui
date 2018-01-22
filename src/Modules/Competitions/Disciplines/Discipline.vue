<script lang="ts">
import Vue from "vue"

import { Next } from "@/types"

import { Discipline } from "./Discipline"

export default Vue.extend({
  name: "Discipline",

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
          <router-link :to="details.routes.show"
                       class="nav-link"
                       exact>
            Details
          </router-link>
        </li>

        <li class="nav-item">
          <router-link :to="details.routes.groups"
                       class="nav-link"
                       exact>
            Groups
          </router-link>
        </li>
      </ul>
      <div class="card-header-tabs-actions">
        <div class="btn-group dropleft">
        <router-link :to="details.routes.competition"
                      class="btn btn-light btn-sm crip-arr left"
                      exact>
          Competition
        </router-link>
        </div>
        <router-link :to="details.routes.disciplines"
                      class="btn btn-light btn-sm crip-arr left"
                      exact>
          Disciplines
        </router-link>
      </div>
    </div><!-- /.card-header -->
     <div class="card-body">
      <router-view></router-view>
     </div>
  </div>
</template>
