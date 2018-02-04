<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import Vue from "vue"

import { Id } from "@/types"

import { Group } from "./Group"
import groupService from "./Service"

export default Vue.extend({
  name: "ManageGroupForm",

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    group: { type: [String, Number], required: true },
  },

  data() {
    return {
      form: new Form(
        new Group({
          competition_id: this.cm,
          discipline_id: this.discipline,
          max: 0,
          min: 0,
          rounds: 0,
          short: "",
          time: 0,
          title: "",
        }),
      ),
    }
  },

  methods: {
    async submit() {
      try {
        const group = await groupService.saveGroup(this.form.data)
        this.$emit("saved", group)
      } catch (errors) {
        this.form.addErrors(errors)
      }
    },

    async destroy() {
      await groupService.deleteGroup(this.form.data)
      this.$emit("deleted", this.form.data.id)
    },

    reset() {
      this.form.data.competition_id = this.cm
      this.form.data.discipline_id = this.discipline
      this.form.data.max = 0
      this.form.data.min = 0
      this.form.data.rounds = 0
      this.form.data.short = ""
      this.form.data.time = 0
      this.form.data.title = ""
      this.form.data.id = 0
    },

    update(group: Group) {
      this.form.data.competition_id = group.competition_id
      this.form.data.discipline_id = group.discipline_id
      this.form.data.max = group.max
      this.form.data.min = group.min
      this.form.data.rounds = group.rounds
      this.form.data.short = group.short
      this.form.data.time = group.time
      this.form.data.title = group.title
      this.form.data.id = group.id
    },

    fetchGroup(id: Id) {
      groupService
        .fetchGroup({
          competition_id: this.cm,
          discipline_id: this.discipline,
          id,
        })
        .then(group => this.update(group))
    },
  },

  created() {
    this.log = this.$logger.component(this)
    if (this.group > 0) this.fetchGroup(this.group)
  },

  watch: {
    group(newId: Id, oldId: Id) {
      this.log("watch:group()", { newId, oldId })

      // Reset form data to default if new id is 0.
      if (newId < 1) {
        this.reset()
        return
      }

      // Fetch data from api and set it to form if new value is existing group
      // identifier.
      this.fetchGroup(newId)
    },
  },
})
</script>


<template>
  <form @submit.prevent="submit">
    <!-- #title -->
    <CFormGroup for="title" :form="form" label="Full title">
      <input
        type="text" id="title" name="title"
        v-model="form.data.title"
        :class="[{'is-invalid': form.errors.title}, 'form-control']"
      >
    </CFormGroup>

    <!-- #short -->
    <CFormGroup for="short" :form="form" label="Short title">
      <input
        type="text" id="short" name="short"
        v-model="form.data.short"
        :class="[{'is-invalid': form.errors.short}, 'form-control']"
      >
    </CFormGroup>

    <!-- #rounds -->
    <CFormGroup for="rounds" :form="form" label="Rounds">
      <input
        type="number" id="rounds" name="rounds"
        v-model="form.data.rounds"
        :class="[{'is-invalid': form.errors.rounds}, 'form-control']"
      >
    </CFormGroup>

    <!-- #time -->
    <CFormGroup for="time" :form="form" label="Round time">
      <input
        type="number" id="time" name="time"
        v-model="form.data.time"
        :class="[{'is-invalid': form.errors.time}, 'form-control']"
      >
    </CFormGroup>

    <!-- #min -->
    <CFormGroup for="min" :form="form" label="Minimum value">
      <input
        type="number" id="min" name="min"
        v-model="form.data.min"
        :class="[{'is-invalid': form.errors.min}, 'form-control']"
      >
    </CFormGroup>

    <!-- #max -->
    <CFormGroup for="max" :form="form" label="Maximum value">
      <input
        type="number" id="max" name="max"
        v-model="form.data.max"
        :class="[{'is-invalid': form.errors.max}, 'form-control']"
      >
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup>
      <button
        id="submit" type="submit"
        class="btn btn-primary btn-sm"
      >
        Save
      </button>

      <button
        v-if="form.data.id > 0" type="button"
        @click="destroy" class="btn btn-danger btn-sm"
      >
        Delete
      </button>
    </CFormGroup>
  </form>
</template>
