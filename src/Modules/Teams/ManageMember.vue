<script lang="ts">
import CripSelect from "crip-vue-select"
import Vue from "vue"

import Form from "@/Components/Forms/Form"
import FormGroup from "@/Components/Forms/FormGroup.vue"
import FormPanel from "@/Components/Forms/FormPanel.vue"
import PanelAction from "@/Components/Panel/PanelAction.vue"

import { manageTeamMember, manageTeamMembers } from "@/Router/Routes"
import { MemberBase } from "@/types"

import teamService from "./Store/Service"
import TeamMember from "./TeamMember"

export default Vue.extend({
  name: "ManageMember",

  components: { FormPanel, PanelAction, FormGroup },

  data() {
    return {
      form: new Form({ user_id: 0, name: "", id: 0 }),
      team: {},
      userSelect: new CripSelect({ async: true }),
    }
  },

  created() {
    this.log = this.$logger.component(this)
    this.fetchTeam()
    this.userSelect.onUpdate((name, update) =>
      teamService.searchUser({ name }).then(users => update(users)),
    )
    this.userSelect.onInit(select => {
      teamService
        .fetchTeamMember({
          id: this.id,
          team_id: this.teamId,
        })
        .then(member => {
          select({
            key: member.user_id || 0,
            text: member.name,
            value: {
              id: member.id,
              user_id: member.user_id,
              name: member.name,
            },
          })
        })
    })
  },

  computed: {
    teamId(): number {
      return parseInt(this.$route.params.team)
    },

    id(): number {
      return parseInt(this.$route.params.id)
    },

    isEdit(): boolean {
      return this.$route.name === manageTeamMember.name
    },

    title(): string {
      if (this.isEdit) return this.$t("teams.manage_member_edit_title") as string

      return this.$t("teams.manage_member_create_title") as string
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
        id: this.id,
        team_id: this.teamId,
      })

      this.form.data.name = member.name
      this.form.data.user_id = member.user_id || 0
      this.form.data.id = member.id

      return member
    },

    async userSearch(name: string) {
      // Search users on server by entered text in input.
      return await teamService.searchUser({ name })
    },

    async saveMember() {
      this.log("saveMember", { data: this.form.data })
      this.form.clearErrors()
      try {
        const member = await teamService.saveTeamMember({
          id: this.form.data.id,
          name: this.form.data.name,
          team_id: this.teamId,
          user_id: this.form.data.user_id,
        })

        this.$notice.success({
          description: "Record sucessfully saved",
          title: "saved",
        })

        this.$router.push(member && member.routes ? member.routes.edit : "")
      } catch (error) {
        const errors = this.concatErrors(error)
        this.form.addErrors(errors)
      }
    },

    concatErrors(errors: any) {
      if (errors.user_id) {
        errors.name = errors.name ? [...errors.name, ...errors.user_id] : errors.user_id
      }

      return errors
    },

    async associatedMember(user: { id: number; name: string } | string) {
      this.log("associatedMember", { user })

      if (typeof user === "string") {
        this.newMember(user)
        return
      }

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
})
</script>

<template>
  <form-panel id="manage-member"
              :form="form"
              :title="title"
              @submit="saveMember">
    <panel-action slot="actions"
                  v-if="team.id"
                  :to="team.routes.manageMembers">
      {{ $t('teams.manage_member_action_back', { team: team.short }) }}
    </panel-action>

    <!-- #name -->
    <form-group for="name"
                :form="form"
                :label="$t('teams.manage_member_name_label')"
                :col-sm="8">

      <crip-select :settings="userSelect"
                   @input="associatedMember"
                   :tags="true" />
    </form-group>

    <!-- #invitation -->
    <form-group :col-sm="8"
                v-if="form.data.user_id && !isEdit">
      <button type="button"
              @click="dismissInvitation"
              class="close text-danger"
              :title="$t('teams.manage_member_invitation_dismiss')">
        &times;
      </button>
      <span>
        {{ $t('teams.manage_member_invitation_text', { name: form.data.name, team: team.short})
        }}
      </span>
    </form-group>

    <!-- #submit -->
    <form-group for="submit"
                :col-sm="8">
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        {{ $t('teams.manage_member_submit_btn') }}
      </button>
    </form-group>
  </form-panel>
</template>

<style lang="scss" scoped>
button.close.text-danger {
  float: none;
  font-weight: bolder;
}
</style>

