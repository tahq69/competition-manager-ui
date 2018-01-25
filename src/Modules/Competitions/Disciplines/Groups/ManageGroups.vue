<script lang="ts">
import Vue from "vue"

import GroupFrom from "./ManageGroupForm.vue"

let i = 0

export default Vue.extend({
  name: "ManageGroups",

  components: { GroupFrom },

  data() {
    return {
      groups: [] as any[],
      showGroupForm: false,
      actualGroup: {} as any,
    }
  },

  methods: {
    createGroup() {
      this.showGroupForm = true
    },

    createCategory(group: any) {
      this.showGroupForm = false
      this.actualGroup = group
    },

    addGroup(group: any) {
      this.groups.push(Object.assign({ i: ++i }, group))
      this.showGroupForm = false
    },

    addCategory(category: any) {
      /*
      this.groups.push(Object.assign({ i: ++i }, category))
      this.showGroupForm = false*/
    },
  },
})
</script>

<template>
  <CRow>
    <CCol :lg="8">
      <table class="table table-bordered">
        <tr v-for="group in groups"
            :key="group.i">
          <td v-for="category in group.categories"
              :key="category.i"></td>
          <td>
            <button @click="createCategory(group)"
                    class="btn btn-light">
              + Category
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button @click="createGroup()"
                    class="btn btn-light">
              + Group
            </button>
          </td>
        </tr>
      </table>
    </CCol>

    <CCol :lg="4">
      <GroupFrom v-if="showGroupForm"
                 :data="actualGroup"
                 @created="addGroup" />
    </CCol>
  </CRow>
</template>
