<script lang="ts">
import Vue from "vue"

import { Next } from "@/types"

import { Group } from "./Group"
import groupService from "./Service"

export default Vue.extend({
  name: "DisciplineGroups",

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { competition_id: to.params.cm, discipline_id: to.params.discipline }
    groupService
      .fetchGroups(payload)
      .then(groups => next(vm => vm.setGroups(groups)))
  },

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true },
  },

  data() {
    return {
      canCreate: false,
      groups: [] as Group[],
    }
  },

  methods: {
    setGroups(groups: Group[]): void {
      this.groups = groups
    },
  },
})
</script>

<template>
  <CCol id="discipline-groups"
        :class="`discipline discipline-${discipline}`">
    <div v-for="group in groups"
         :key="group.id">{{ group.title }} <small>{{ group.short }}</small></div>
  </CCol>
</template>

