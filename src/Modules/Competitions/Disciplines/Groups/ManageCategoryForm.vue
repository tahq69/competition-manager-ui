<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import Vue from "vue"

import { Id } from "@/types"

import { Category, DisplayType } from "./Category"
import { Group } from "./Group"
import groupService from "./Service"

export default Vue.extend({
  name: "ManageCategoryForm",

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    group: { type: [String, Number], required: true },
    category: { type: [String, Number], required: true },
  },

  data() {
    return {
      form: new Form(
        new Category({
          category_group_id: this.group,
          competition_id: this.cm,
          discipline_id: this.discipline,
          display_type: DisplayType.Max,
          id: 0,
          max: 0,
          min: 0,
          short: "",
          title: "",
        }),
      ),
    }
  },

  methods: {
    async submit() {
      try {
        const category = await groupService.saveCategory(this.form.data)
        this.$emit("saved", category)
      } catch (errors) {
        this.form.addErrors(errors)
      }
    },

    async destroy() {
      await groupService.deleteCategory(this.form.data)
      this.$emit("deleted", this.form.data.id)
    },

    reset() {
      this.form.data.category_group_id = this.group
      this.form.data.competition_id = this.cm
      this.form.data.discipline_id = this.discipline
      this.form.data.display_type = DisplayType.Max
      this.form.data.id = 0
      this.form.data.max = 0
      this.form.data.min = 0
      this.form.data.short = ""
      this.form.data.title = ""
    },

    update(category: Category) {
      this.form.data.category_group_id = category.category_group_id
      this.form.data.competition_id = category.competition_id
      this.form.data.discipline_id = category.discipline_id
      this.form.data.max = category.max
      this.form.data.min = category.min
      this.form.data.short = category.short
      this.form.data.title = category.title
      this.form.data.display_type = category.display_type
      this.form.data.id = category.id
    },

    fetchCategory(id: Id) {
      groupService
        .fetchCategory({
          category_group_id: this.group,
          competition_id: this.cm,
          discipline_id: this.discipline,
          id,
        })
        .then(category => this.update(category))
    },
  },

  created() {
    this.log = this.$logger.component(this)
    if (this.category > 0) this.fetchCategory(this.category)
  },

  watch: {
    category(newId: Id, oldId: Id) {
      this.log("watch:category()", { newId, oldId })

      // Reset form data to default if new id is 0.
      if (newId < 1) {
        this.reset()
        return
      }

      // Fetch data from api and set it to form if new value is existing
      // category identifier.
      this.fetchCategory(newId)
    },
  },
})
</script>


<template>
  <form @submit.prevent="submit">
    <!-- #title -->
    <CFormGroup
      for="title" :form="form" label="Full title"
      :xs="12" :sm="12" :md="12" :compact="true"
    >
      <input
        type="text" id="title" name="title"
        v-model="form.data.title"
        :class="[
          {'is-invalid': form.errors.title},
          'form-control', 'form-control-sm'
        ]"
      >
    </CFormGroup>

    <!-- #short -->
    <CFormGroup
      for="short" :form="form" label="Short title"
      :xs="12" :sm="12" :md="12" :compact="true"
    >
      <input
        type="text" id="short" name="short"
        v-model="form.data.short"
        :class="[
          {'is-invalid': form.errors.short},
          'form-control', 'form-control-sm'
        ]"
      >
    </CFormGroup>

    <!-- #min -->
    <CFormGroup
      for="min" :form="form" label="Minimum value"
      :xs="12" :sm="12" :md="12" :compact="true"
    >
      <input
        type="number" id="min" name="min"
        v-model="form.data.min"
        :class="[
          {'is-invalid': form.errors.min},
          'form-control', 'form-control-sm'
        ]"
      >
    </CFormGroup>

    <!-- #max -->
    <CFormGroup
      for="max" :form="form" label="Maximum value"
      :xs="12" :sm="12" :md="12" :compact="true"
    >
      <input
        type="number" id="max" name="max"
        v-model="form.data.max"
        :class="[
          {'is-invalid': form.errors.max},
          'form-control', 'form-control-sm'
        ]"
      >
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup :xs="12" :sm="12" :md="12">
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
