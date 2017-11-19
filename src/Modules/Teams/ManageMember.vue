<template>
  <form-panel
      id="manage-member"
      :form="form"
      :title="title"
      @submit="saveMember"
  >
    <panel-action
        slot="actions"
        v-if="team.id"
        :to="team.routes.manageMembers"
    >
      {{ $t('teams.manage_member_action_back', { team: team.short }) }}
    </panel-action>

    <!-- #name -->
    <form-group
        for="name"
        :form="form"
        :label="$t('teams.manage_member_name_label')"
        :col-sm="8"
    >
      <form-select
          :async="true"
          :search-options="userSearch"
          :text="(o) => o.name"
          @input="associatedMember"
          @create="newMember"
      />
    </form-group>

    <!-- #invitation -->
    <form-group :col-sm="8" v-if="form.data.userId">
      <button
          type="button"
          @click="dismissInvitation"
          class="close text-danger"
          :title="$t('teams.manage_member_invitation_dismiss')"
      >
        &times;
      </button>
      <span>
        {{ $t('teams.manage_member_invitation_text', {
          name: form.data.name,
          team: team.short,
        }) }}
      </span>
    </form-group>

    <!-- #submit -->
    <form-group for="submit" :col-sm="8">
      <button id="submit" type="submit" class="btn btn-primary">
        {{ $t('teams.manage_member_submit_btn') }}
      </button>
    </form-group>
  </form-panel>
</template>

<script lang="ts">
import Form from "@/Components/Forms/Form"
import FormPanel from "@/Components/Forms/FormPanel.vue"
import FormGroup from "@/Components/Forms/FormGroup.vue"
import FormSelect from "@/Components/Forms/FormSelect.vue"
import PanelAction from "@/Components/Panel/PanelAction"

import { manageTeamMembers, manageTeamMember } from "@/Router/Routes"

import teamService from "./Store/Service"

export default {
  name: "ManageMember",

  components: { FormPanel, PanelAction, FormGroup, FormSelect },

  data() {
    return {
      team: {},
      form: new Form({ userId: 0, name: "", id: 0 }),
    }
  },

  created() {
    this.$logger.component(this)
    this.fetchTeam()
  },

  computed: {
    teamId() {
      return this.$route.params.team | 0
    },

    id() {
      return this.$route.params.id | 0
    },

    isEdit(): boolean {
      return this.$route.name === manageTeamMember.name
    },

    title() {
      if (this.isEdit) return this.$t("teams.manage_member_edit_title")

      return this.$t("teams.manage_member_create_title")
    },
  },

  methods: {
    async fetchTeam() {
      const team = await teamService.fetchTeam({
        id: this.teamId,
      })

      this.team = team

      return team
    },

    async fetchTeamMember() {
      const member = await teamService.fetchTeamMember({
        team_id: this.teamId,
        id: this.id,
      })

      this.form.data.name = member.name
      this.form.data.userId = member.user_id
      this.form.data.id = member.id

      return member
    },

    async userSearch(name: string) {
      // Search users on server by entered text in input.
      const users = await teamService.searchUser({
        name: name,
      })

      return users
    },

    async preloadMember(select: (text, value) => void) {
      if (!this.isEdit) return
      const member = await this.fetchTeamMember()
      select(member.name, member.user_id)
    },

    async saveMember() {
      const member = await teamService.saveTeamMember({
        team_id: this.teamId,
        name: this.form.data.name,
        user_id: this.form.data.userId,
        id: this.form.data.id,
      })

      this.$logger.log({ action: "saveMember", member })
    },

    async associatedMember(user: { id: number; name: string }) {
      this.$logger.log("associatedMember", user)
      if (!user) return

      this.form.data.userId = user.id
      this.form.data.name = user.name
    },

    newMember(name: string) {
      this.$logger.log("newMember")
      this.form.data.userId = 0
      this.form.data.name = name
    },

    dismissInvitation() {
      this.form.data.userId = 0
    },
  },
}
</script>

<style lang="scss" scoped>
button.close.text-danger {
  float: none;
  font-weight: bolder;
}
</style>

