<script lang="ts">
import Vue from "vue";

import * as roles from "@/components/auth/roles";

import { fetchMemberRoles } from "#/teams/members/service";

export default Vue.extend({
  name: "MemberRoleControl",

  props: {
    team: { type: [String, Number], required: true },
    member: { type: [String, Number], required: true }
  },

  data: () => ({
    roles: [] as string[],
    options: [
      { key: "1", label: "Manage team details", value: roles.MANAGE_TEAMS },
      { key: "2", label: "Manage team members", value: roles.MANAGE_MEMBERS },
      {
        key: "3",
        label: "Manage team member roles",
        value: roles.MANAGE_MEMBER_ROLES
      }
    ]
  }),

  created() {
    this.log = this.$logger.component(this);

    fetchMemberRoles({ team: this.team, member: this.member }).then(
      roles => (this.roles = roles)
    );
  },

  watch: {
    roles(selectedRoles: string[]) {
      this.$emit("input", selectedRoles);
    }
  }
});
</script>

<template>
  <el-select v-model="roles"
             multiple
             placeholder="Select roles">
    <el-option v-for="item in options"
               :key="item.key"
               :label="item.label"
               :value="item.value">
    </el-option>
  </el-select>
</template>
