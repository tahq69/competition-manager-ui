<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import CripSelect from "crip-vue-select"
import Vue from "vue"

import { Next } from "@/types"

import { Discipline } from "./Discipline"
import disciplineService from "./Service"

export default Vue.extend({
  name: "ManageDiscipline",

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = { competition_id: to.params.competition_id, id: to.params.id }
    disciplineService
      .fetchDiscipline(payload)
      .then(discipline => next(vm => vm.setDiscipline(discipline)))
  },

  data() {
    return {
      discipline: {} as Discipline,
      form: {} as Form<Discipline>,
      typeSelect: new CripSelect({
        options: [
          { key: "1", text: "Kickboxing", value: "KICKBOXING" },
          { key: "2", text: "Box", value: "BOXING" },
        ],
      }),
    }
  },

  computed: {
    id(): number {
      return parseInt(this.$route.params.id, 10)
    },

    competitionId(): number {
      return parseInt(this.$route.params.competition_id, 10)
    },
  },

  methods: {
    setDiscipline(discipline: Discipline): void {
      this.discipline = Object.assign({}, discipline)
      this.form = new Form(discipline)
    },

    async save() {
      this.log("save()", this.form.data)
      const discipline = await disciplineService.saveDiscipline(this.form.data)
      this.$notice.success({ title: "Discipline saved" })
      this.$router.push(discipline.routes.show)
    },
  },

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <CRow v-if="form.data">
    <CFormPanel :title="`Manage discipline: ${discipline.title}`"
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
  </CRow>
</template>

<style lang="scss">
#manage-discipline {
  padding-top: 15px;
}
</style>

