<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import Vue from "vue"

import { Group } from "./Group"
import groupService from "./Service"

export default Vue.extend({
  name: "ManageGroupForm",

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
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
  },
})
</script>


<template>
  <form @submit.prevent="submit">
    <!-- #title -->
    <CFormGroup
      for="title"
      :form="form"
      label="Full title"
      :xs="12" :sm="12" :md="12" :compact="true"
    >
      <input
        type="text"
        id="title"
        v-model="form.data.title"
        name="title"
        :class="[
          {'is-invalid': form.errors.title},
          'form-control', 'form-control-sm'
        ]"
      >
    </CFormGroup>

    <!-- #short -->
    <CFormGroup
      for="short"
      :form="form"
      label="Short title"
      :xs="12" :sm="12" :md="12" :compact="true"
    >
      <input
        type="text"
        id="short"
        v-model="form.data.short"
        name="short"
        :class="[
          {'is-invalid': form.errors.short},
          'form-control', 'form-control-sm'
        ]"
      >
    </CFormGroup>

    <!-- #rounds -->
    <CFormGroup
      for="rounds"
      :form="form"
      label="Rounds"
      :xs="12" :sm="12" :md="12" :compact="true"
    >
      <input
        type="number"
        id="rounds"
        v-model="form.data.rounds"
        name="rounds"
        :class="[
          {'is-invalid': form.errors.rounds},
          'form-control', 'form-control-sm'
        ]"
      >
    </CFormGroup>

    <!-- #time -->
    <CFormGroup
      for="time"
      :form="form"
      label="Round time"
      :xs="12" :sm="12" :md="12" :compact="true"
    >
      <input
        type="number"
        id="time"
        v-model="form.data.time"
        name="time"
        :class="[
          {'is-invalid': form.errors.time},
          'form-control', 'form-control-sm'
        ]"
      >
    </CFormGroup>

    <!-- #min -->
    <CFormGroup
      for="min"
      :form="form"
      label="Minimum value"
      :xs="12" :sm="12" :md="12" :compact="true"
    >
      <input
        type="number"
        id="min"
        v-model="form.data.min"
        name="min"
        :class="[
          {'is-invalid': form.errors.min},
          'form-control', 'form-control-sm'
        ]"
      >
    </CFormGroup>

    <!-- #max -->
    <CFormGroup
      for="max"
      :form="form"
      label="Maximum value"
      :xs="12" :sm="12" :md="12" :compact="true"
    >
      <input
        type="number"
        id="max"
        v-model="form.data.max"
        name="max"
        :class="[
          {'is-invalid': form.errors.max},
          'form-control', 'form-control-sm'
        ]"
      >
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup :xs="12" :sm="12" :md="12">
      <button id="submit" type="submit" class="btn btn-primary btn-sm">
        Save
      </button>
    </CFormGroup>
  </form>
</template>
