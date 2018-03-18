<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import CripSelect, { SelectOption, UpdateOptions } from "crip-vue-select"
import Vue from "vue"
import { Location } from "vue-router"

import { manageTeamMember, manageTeamMembers } from "@/router/routes"
import { MemberBase } from "@/types"

import teamService from "../../service"
import { Team } from "../../team"
import { TeamMember } from "../../team-member"
import memberService from "../service"

interface IData {
  form: Form<{ user_id: number | string; name: string; id: number | string }>
  team: Team | boolean
  userSelect: CripSelect<MemberBase>
  initialUserId: number
}

export default Vue.extend({
  name: "ManageMember",

  data(): IData {
    return {
      form: new Form({ user_id: 0, name: "", id: 0 }),
      initialUserId: 0,
      team: false,
      userSelect: new CripSelect({ async: true }),
    }
  },

  created() {
    this.log = this.$logger.component(this)
    this.fetchTeam()
    this.userSelect.onUpdate(this.searchUser)
    this.userSelect.onInit(this.fetchTeamMember)
  },

  computed: {
    teamId(): number {
      return parseInt(this.$route.params.team, 10)
    },

    id(): number {
      return parseInt(this.$route.params.id, 10)
    },

    isEdit(): boolean {
      return this.$route.name === manageTeamMember.name
    },

    title(): string {
      if (this.isEdit) return this.$t("teams.manage_member_edit_title") as string

      return this.$t("teams.manage_member_create_title") as string
    },

    isInvitationVisible(): boolean {
      return !!this.form.data.user_id && this.form.data.user_id !== this.initialUserId
    },

    invitation(): Location | {} {
      if (typeof this.team === "boolean") return {}
      return { name: this.form.data.name, team: this.team.short }
    },
  },

  methods: {
    async fetchTeam() {
      const team = await teamService.fetchTeam({ id: this.teamId })

      this.team = team
    },

    async fetchTeamMember(select: SelectOption<MemberBase>): Promise<void> {
      if (!this.isEdit) return

      const member = await memberService.fetchTeamMember({
        id: this.id,
        team_id: this.teamId,
      })

      const userId = member.user_id || 0
      this.initialUserId = userId

      // Fil up form with member information from API.
      this.form.data.name = member.name
      this.form.data.user_id = userId
      this.form.data.id = member.id

      // Select member for dropdown component.
      select({
        key: userId,
        text: member.name,
        value: {
          id: member.id,
          name: member.name,
          user_id: userId,
        },
      })
    },

    async searchUser(criteria: string, update: UpdateOptions<MemberBase>) {
      // Search users on server by entered text in input.
      const options = await teamService.searchUser({ name })

      update(options)
    },

    async associatedMember(user: MemberBase | string | null) {
      this.log("associatedMember", { user })

      if (typeof user === "string") {
        this.newMember(user)
        return
      }

      if (user === null) {
        this.form.data.user_id = 0
        this.form.data.name = ""

        return
      }

      this.form.data.user_id = user.user_id
      this.form.data.name = user.name
    },

    newMember(name: string) {
      this.log("newMember", { name })
      this.form.data.user_id = 0
      this.form.data.name = name
    },

    async saveMember() {
      this.log("saveMember", { data: this.form.data })
      this.form.clearErrors()
      try {
        const member = await memberService.saveTeamMember({
          id: this.form.data.id,
          name: this.form.data.name,
          team_id: this.teamId,
          user_id: this.form.data.user_id,
        })

        this.$notice.success(this.notificationDetails())

        this.initialUserId = member.user_id || 0
        this.$router.push(member.routes.edit)
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

    dismissInvitation() {
      this.form.data.user_id = 0
    },

    notificationDetails(): { title: string; description: string } {
      if (this.isInvitationVisible) {
        return {
          description: this.$t(
            "teams.manage_member_invitation_sent_body",
            this.invitation,
          ).toString(),
          title: this.$t("teams.manage_member_invitation_sent_title").toString(),
        }
      }

      return {
        description: this.$t("teams.manage_member_saved_body", this.invitation).toString(),
        title: this.$t("teams.manage_member_saved_title").toString(),
      }
    },
  },
})
</script>

<template>
  <CFormCard id="manage-member"
             :form="form"
             :title="title"
             @submit="saveMember"
             class="col-xs-12">
    <CCardAction slot="actions"
                 v-if="team.id"
                 :to="team.routes.manageMembers">
      {{ $t('teams.manage_member_action_back', { team: team.short }) }}
    </CCardAction>

    <!-- #name -->
    <CFormGroup for="name"
                :form="form"
                :label="$t('teams.manage_member_name_label')"
                :sm="8">

      <crip-select :settings="userSelect"
                   :clear="true"
                   :tags="true"
                   @input="associatedMember" />
    </CFormGroup>

    <!-- #invitation -->
    <CFormGroup :sm="8"
                v-if="isInvitationVisible">
      <button type="button"
              @click="dismissInvitation"
              class="close text-danger"
              :title="$t('teams.manage_member_invitation_dismiss')">
        &times;
      </button>
      <span>
        {{ $t('teams.manage_member_invitation_text', invitation) }}
      </span>
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup for="submit"
                :sm="8">
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        {{ $t('teams.manage_member_submit_btn') }}
      </button>
    </CFormGroup>
  </CFormCard>
</template>

<style lang="scss" scoped>
button.close.text-danger {
  float: none;
  font-weight: bolder;
}
</style>
