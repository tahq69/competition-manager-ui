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
      Back to {{ team.short }} members
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

    <!-- #submit -->
    <form-group for="submit" :col-sm="8">
      <span v-if="form.userId && form.userId != userId">
        <button
            type="button"
            @click="dismissInvitation"
            class="close text-danger"
        >&times;</button>
        {{form.name}} will receive invitation to join {{ team.short }} team
      </span>

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

import store from "@/Store"
import { manageTeamMembers, manageTeamMember } from "@/Router/Routes"
import { ISearchUser } from "@/Store/Contracts"

import {
  IFetchTeam,
  ISaveTeamMember,
  IFetchTeamMember,
} from "./Store/Contracts"

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
      const team = await store.dispatch<IFetchTeam>({
        type: "fetchTeam",
        id: this.teamId,
      })

      this.team = team

      return team
    },

    async fetchTeamMember() {
      const member = await store.dispatch<IFetchTeamMember>({
        type: "fetchTeamMember",
        id: this.id,
      })

      this.form.data.name = member.name
      this.form.data.userId = member.user_id
      this.form.data.id = member.id

      return member
    },

    async userSearch(name: string) {
      // Search users on server by entered text in input.
      const users = await store.dispatch<ISearchUser>({
        type: "searchUser",
        name: name,
      })

      // Convert server response to select2 compatible list of elements for
      // select.
      return users.map(({ id, name }) => {
        return { id, name }
      })
    },

    async preloadMember(select: (text, value) => void) {
      if (!this.isEdit) return
      const member = await this.fetchTeamMember()
      select(member.name, member.user_id)
    },

    async saveMember() {
      const member = await store.dispatch<ISaveTeamMember>({
        type: "saveTeamMember",
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
