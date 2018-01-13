<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import CripSelect from "crip-vue-select"
import Vue from "vue"
import { Location } from "vue-router"

import { manageCompetitionDiscipline } from "@/Router/Routes"
import { Next } from "@/types"

import { Discipline } from "./Discipline"
import disciplineService from "./Service"

const editRoute = manageCompetitionDiscipline

export default Vue.extend({
  name: "ManageDiscipline",

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: false },
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { competition_id: to.params.cm, id: to.params.discipline }

    if (to.name === editRoute.name) {
      // If we open edit route, we have to load data from API.
      disciplineService
        .fetchDiscipline(payload)
        .then(discipline => next(vm => vm.setDiscipline(discipline)))
    } else {
      // If we open create route, we have no data to load from API.
      next()
    }
  },

  data() {
    return {
      disciplineTitle: "",
      form: new Form(
        new Discipline({
          competition_id: this.cm,
          title: "",
          short: "",
          type: "",
          game_type: "",
          description: "",
        }),
      ),
      typeSelect: new CripSelect({
        options: [
          { key: "1", text: "Kickboxing", value: "KICKBOXING" },
          { key: "2", text: "Box", value: "BOXING" },
        ],
      }),
    }
  },

  computed: {
    isEdit(): boolean {
      return this.$route.name === editRoute.name
    },

    title(): string {
      if (this.isEdit) return `Manage discipline: ${this.disciplineTitle}`
      return "Create new discipline"
    },
  },

  methods: {
    setDiscipline(discipline: Discipline): void {
      this.disciplineTitle = discipline.title
      this.form = new Form(discipline)
    },

    async save() {
      this.log("save()", this.form.data)
      try {
        const discipline = await disciplineService.saveDiscipline(this.form.data)
        this.$notice.success({ title: "Discipline saved" })
        this.$router.push(discipline.routes.show)
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
  <CFormPanel :title="title"
              id="manage-discipline"
              @submit="save">

    <!-- #title -->
    <CFormGroup for="title"
                :form="form"
                label="Title">
      <input type="text"
             id="title"
             v-model="form.data.title"
             name="title"
             class="form-control">
    </CFormGroup>

    <!-- #short -->
    <CFormGroup for="short"
                :form="form"
                label="Short title">
      <input type="text"
             id="short"
             v-model="form.data.short"
             name="short"
             class="form-control">
    </CFormGroup>

    <!-- #type -->
    <CFormGroup for="type"
                :form="form"
                label="Type">

      <crip-select id="type"
                   :settings="typeSelect"
                   v-model="form.data.type" />
    </CFormGroup>

    <!-- #game_type -->
    <CFormGroup for="game_type"
                :form="form"
                label="Game type">

      <textarea id="game_type"
                v-model="form.data.game_type"
                class="form-control"
                rows="8"></textarea>
    </CFormGroup>

    <!-- #description -->
    <CFormGroup for="description"
                :form="form"
                label="Description">

      <textarea id="description"
                v-model="form.data.description"
                class="form-control"
                rows="8"></textarea>
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup>
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        Save
      </button>
    </CFormGroup>
  </CFormPanel>
</template>
