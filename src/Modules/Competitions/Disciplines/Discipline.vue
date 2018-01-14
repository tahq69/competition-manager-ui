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
    // Required only for routes, se we have no need to fetch data from server.
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
  <CCol id="discipline"
        :class="`discipline discipline-${discipline}`">
    <ul v-if="details.routes"
        class="nav nav-tabs">
      <router-link :to="details.routes.show"
                   tag="li"
                   exact>
        <a>Details</a>
      </router-link>

      <router-link :to="details.routes.groups"
                   tag="li">
        <a>Groups</a>
      </router-link>
    </ul>

    <router-view></router-view>
  </CCol>
</template>

