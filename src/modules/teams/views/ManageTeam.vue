<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import Vue from "vue"

import FileInput from "@/components/form/FileInput.vue"
import Storage from "@/helpers/local-storage"
import { manageTeam } from "@/router/routes"
import { Next } from "@/types"

import { createTeamMemberRoute, manageTeamMembersRoute } from "../members/routes"
import { manageTeamsRoute } from "../routes"
import teamService from "../service"
import { Team } from "../team"

export default Vue.extend({
  name: "ManageTeam",

  components: { FileInput },

  beforeRouteEnter(to, from, next: Next<any>) {
    const open = (team: Team) => next(vm => vm.setTeam(team))

    // If we open create route, we have no data to load from API and we can
    // initialize from with emtry data record.
    if (to.name !== manageTeam.name) return open(new Team({}))

    // If we open edit route, we load data from API and show it in a form.
    const payload = { id: to.params.team }
    teamService.fetchTeam(payload).then(team => open(team))
  },

  data: () => ({
    form: new Form(new Team({})),
    teamName: "",
  }),

  computed: {
    isEdit(): boolean {
      return this.$route.name === manageTeam.name
    },

    title(): string {
      if (this.isEdit) return `Manage team: ${this.teamName}`
      return "Create new team"
    },

    manageTeamsRoute(): any {
      return manageTeamsRoute()
    },

    manageTeamMembersRoute(): any {
      return manageTeamMembersRoute({ team: this.form.data.id })
    },

    createTeamMemberRoute(): any {
      return createTeamMemberRoute({ team: this.form.data.id })
    },
  },

  methods: {
    setTeam(team: Team) {
      this.form.data = team
      this.teamName = team.name
    },

    async save() {
      this.log("save()", this.form.data)

      this.form.clearErrors()
      try {
        const team = await teamService.saveTeam(this.form.data)
        this.$notice.success({ title: "Team saved" })
        this.$router.push(team.routes.edit)
      } catch (errors) {
        this.form.addErrors(errors)
      }
    },
  },

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <CFormCard :title="title"
             :form="form"
             id="manage-team"
             @submit="save">

    <span slot="actions">
      <CCardAction :to="manageTeamsRoute">
        Teams
      </CCardAction>

      <CCardAction v-if="isEdit"
                   :to="manageTeamMembersRoute">
        Manage members
      </CCardAction>

      <CCardAction v-if="isEdit"
                   :to="createTeamMemberRoute">
        Add member
      </CCardAction>
    </span>

    <!-- #name -->
    <CFormGroup for="name"
                :form="form"
                label="Name">
      <input type="text"
             id="name"
             v-model="form.data.name"
             name="name"
             :class="[{'is-invalid': form.errors.name}, 'form-control']">
    </CFormGroup>

    <!-- #short -->
    <CFormGroup for="short"
                :form="form"
                label="Short title">
      <input type="text"
             id="short"
             v-model="form.data.short"
             name="short"
             :class="[{'is-invalid': form.errors.short}, 'form-control']">
    </CFormGroup>

    <!-- #logo -->
    <CFormGroup for="logo"
                :form="form"
                label="Team logo">
      <FileInput id="logo"
                 name="logo"
                 size="sm"
                 type="image"
                 v-model="form.data.logo"
                 :form="form"
                 :input-class="[{'is-invalid': form.errors.logo}, 'form-control']" />
    </CFormGroup>

    <!-- #logo-preview -->
    <CFormGroup v-if="form.data.logo">
      <img :src="form.data.logo">
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup>
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        Save
      </button>
    </CFormGroup>
  </CFormCard>
</template>