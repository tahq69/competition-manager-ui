<script lang="ts">
import Vue from "vue"

import { Id, Next } from "@/types"

import { Category } from "./Category"
import { Group } from "./Group"
import GroupFrom from "./ManageGroupForm.vue"
import groupService from "./Service"

export default Vue.extend({
  name: "ManageGroups",

  components: { GroupFrom },

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = {
      competition_id: to.params.cm,
      discipline_id: to.params.discipline,
    }
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
      groups: [] as Group[],
      groupId: 0 as Id,
      showGroupForm: false,
    }
  },

  methods: {
    async setGroups(groups: Group[]): Promise<void> {
      this.groups = groups
    },

    createGroup() {
      this.showGroupForm = true
      this.groupId = 0
    },

    editGroup(id: Id) {
      this.showGroupForm = true
      this.groupId = id
    },

    createCategory(group: Group) {
      this.showGroupForm = false
    },

    onGroupSaved(group: Group) {
      this.showGroupForm = false
      const existing = this.groups.filter(
        g => g.id.toString() === group.id.toString(),
      )

      // If item does not exist in grid, add it.
      if (existing.length === 0) {
        this.groups.push(group)
        return
      }

      // If exists, update its value.
      Object.assign(existing[0], group)
    },

    onCategorySaved(category: any) {
      /*
      this.groups.push(Object.assign({ i: ++i }, category))
      this.showGroupForm = false*/
    },
  },
})
</script>

<template>
  <CRow>
    <CCol :xs="12" :lg="8">
      <table class="table table-bordered">
        <tr v-for="group in groups" :key="group.id">
          <td>
            <button @click="editGroup(group.id)" class="btn btn-light">
              {{ group.short }}
            </button>
          </td>
          <td v-for="category in group.categories" :key="category.id"></td>
          <td>
            <button @click="createCategory(group)" class="btn btn-light">
              + Category
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button @click="createGroup()" class="btn btn-light">
              + Group
            </button>
          </td>
        </tr>
      </table>
    </CCol>

    <CCol :xs="12" :lg="4">
      <GroupFrom
        v-if="showGroupForm"
        :cm="cm" :discipline="discipline" :group="groupId"
        @saved="onGroupSaved"
      />
    </CCol>
  </CRow>
</template>
