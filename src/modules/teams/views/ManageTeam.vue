<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import Vue from "vue"

import { manageTeam } from "@/router/routes"
import { Next } from "@/types"

import teamService from "../service"
import { Team } from "../team"

export default Vue.extend({
  name: "ManageTeam",

  beforeRouteEnter(to, from, next: Next<any>) {
    const open = (team: Team) => next(vm => vm.setTeam(team))

    // If we open create route, we have no data to load from API and we can
    // initialize from with emtry data record.
    if (to.name !== manageTeam.name) return open(new Team({}))

    // If we open edit route, we load data from API and show it in a form.
    const payload = { id: to.params.team }
    teamService.fetchTeam(payload).then(team => open(team))
  },

  data() {
    return {
      form: new Form(new Team({})),
      teamName: "",
    }
  },

  computed: {
    isEdit(): boolean {
      return this.$route.name === manageTeam.name
    },

    title(): string {
      if (this.isEdit) return `Manage team: ${this.teamName}`
      return "Create new team"
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
        this.log(errors)
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
      <input type="text"
             id="logo"
             v-model="form.data.logo"
             name="logo"
             :class="[{'is-invalid': form.errors.logo}, 'form-control']">
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