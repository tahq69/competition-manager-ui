<script lang="ts">
import Vue from "vue";

import * as roles from "@/components/auth/roles";

import memberService from "../service";

export default Vue.extend({
  name: "MemberRoleControl",

  props: {
    team: { type: [String, Number], required: true },
    member: { type: [String, Number], required: true }
  },

  data: () => ({
    roles: [] as string[],
    /*rolesSelect: new CripSelect([
      { key: "1", text: "Manage team details", value: roles.MANAGE_TEAMS },
      { key: "2", text: "Manage team members", value: roles.MANAGE_MEMBERS },
      {
        key: "3",
        text: "Manage team member roles",
        value: roles.MANAGE_MEMBER_ROLES
      }
    ])*/
  }),

  created() {
    this.log = this.$logger.component(this);

    memberService
      .fetchRoles({ team: this.team, member: this.member })
      .then(roles => (this.roles = roles));
  },

  watch: {
    roles(selectedRoles: string[]) {
      this.$emit("input", selectedRoles);
    }
  }
});
</script>

<template>
  <CripSelect id="member-roles"
              multiple
              :settings="rolesSelect"
              v-model="roles">
    All roles assigned
  </CripSelect>
</template>
