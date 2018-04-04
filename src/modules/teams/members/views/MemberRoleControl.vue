<script lang="ts">
import CripSelect from "crip-vue-select";
import Vue from "vue";

import * as roles from "@/components/auth/roles";

import memberService from "../service";

export default Vue.extend({
  name: "MemberRoleControl",

  props: {
    member: { type: [String, Number], required: true },
    team: { type: [String, Number], required: true }
  },

  data: () => ({
    roles: [] as string[],
    rolesSelect: new CripSelect([
      { key: "1", text: "Manage team details", value: roles.MANAGE_TEAMS },
      { key: "2", text: "Manage team members", value: roles.MANAGE_MEMBERS },
      {
        key: "3",
        text: "Manage team member roles",
        value: roles.MANAGE_MEMBER_ROLES
      }
    ])
  }),

  async created() {
    this.log = this.$logger.component(this);
    this.roles = await memberService.fetchRoles({
      team: this.team,
      member: this.member
    });
  },

  watch: {
    roles(selectedRoles: string[]) {
      this.$emit("input", selectedRoles);
    }
  }
});
</script>

<template>
  <crip-select id="member-roles"
               multiple
               :settings="rolesSelect"
               v-model="roles">
    All roles assigned
  </crip-select>
</template>
