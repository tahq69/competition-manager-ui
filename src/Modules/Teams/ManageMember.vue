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
          :init="preloadMember"
          @input="associatedMember"
          @create="newMember"
      />
    </form-group>

    <!-- #invitation -->
    <form-group :col-sm="8" v-if="form.data.user_id && !isEdit">
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
import Notice from "@/Components/Notice"

import { manageTeamMembers, manageTeamMember } from "@/Router/Routes"

import teamService from "./Store/Service"
import TeamMember from "./TeamMember"

export default {
  name: "ManageMember",

  components: { FormPanel, PanelAction, FormGroup, FormSelect },

  data() {
    return {
      team: {},
      userOptions: [],
      form: new Form({ user_id: 0, name: "", id: 0 }),
    }
  },

  created() {
    this.log = this.$logger.component(this)
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

    async fetchTeamMember(): Promise<TeamMember> {
      const member = await teamService.fetchTeamMember({
        team_id: this.teamId,
        id: this.id,
      })

      this.form.data.name = member.name
      this.form.data.user_id = member.user_id || 0
      this.form.data.id = member.id

      return member
    },

    async userSearch(name: string) {
      // Search users on server by entered text in input.
      return await teamService.searchUser({
        name: name,
      })
    },

    async preloadMember() {
      this.log("preloadMember", { isEdit: this.isEdit })
      if (!this.isEdit) return

      const member = (await this.fetchTeamMember()) as TeamMember
      return { id: member.user_id, name: member.name }
    },

    async saveMember() {
      this.log("saveMember", { data: this.form.data })
      this.form.clearErrors()
      try {
        const member = await teamService.saveTeamMember({
          team_id: this.teamId,
          name: this.form.data.name,
          user_id: this.form.data.user_id,
          id: this.form.data.id,
        })

        Notice.success({
          title: "saved",
          description: "Record sucessfully saved",
        })

        this.$router.push(member.routes.edit)
      } catch (error) {
        const errors = this.concatErrors(error)
        this.form.addErrors(errors)
      }
    },

    concatErrors(errors) {
      if (errors.user_id) {
        errors.name = errors.name
          ? [...errors.name, ...errors.user_id]
          : errors.user_id
      }

      return errors
    },

    async associatedMember(user: { id: number; name: string }) {
      this.log("associatedMember", { user })
      if (!user) return

      this.form.data.user_id = user.id
      this.form.data.name = user.name
    },

    newMember(name: string) {
      this.log("newMember", { name })
      this.form.data.user_id = 0
      this.form.data.name = name
    },

    dismissInvitation() {
      this.form.data.user_id = 0
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

