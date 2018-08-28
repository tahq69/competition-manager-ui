<script lang="ts">
import Vue from "vue";
import { Route } from "vue-router";

import { alphaDashSpace, positiveInt, required } from "@/helpers/validators";
import { emitEvent } from "@/helpers";
import { ElForm, Rules, Rule, Id } from "@/typings";
import { createCategory as createRoute } from "@/router/routes";

import areaService from "@/modules/competitions/areas/service";

import {
  Area,
  Category,
  DisplayType,
  Group,
  ManageCategory
} from "@/modules/competitions/models";
import {
  fetchCategory,
  saveCategory,
  deleteCategory
} from "@/modules/competitions/groups/service";

export default Vue.extend({
  name: "ManageCategoryForm",

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    group: { type: [String, Number], required: true },
    category: { type: [String, Number], required: false }
  },

  data: () => ({
    loading: true,
    errors: {},
    form: new ManageCategory(),
    areaOptions: [] as Area[],
    displayTypeOptions: [
      { key: "1", label: "Maximum", value: DisplayType.Max },
      { key: "2", label: "Minimum", value: DisplayType.Min },
      { key: "3", label: "Both", value: DisplayType.Both }
    ]
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules: (): Rules<ManageCategory> => ({
      area_id: [required("Please select available value")],
      display_type: [required("Please select available value")],
      max: [
        required("Please enter maximum available value"),
        positiveInt("Value must be positive number")
      ],
      min: [
        required("Please enter minimum available value"),
        positiveInt("Value must be positive number")
      ],
      short: [
        required("Please enter short name of the category"),
        alphaDashSpace(
          "Short name may contain only characters, numbers and spaces"
        )
      ],
      title: [
        required("Please enter title of the category"),
        alphaDashSpace("Title may contain only characters, numbers and spaces")
      ]
    })
  },

  methods: {
    async fetchData() {
      this.loading = true;

      const areas = await areaService.fetchAreas({ competition_id: this.cm });
      areas.forEach(area => this.areaOptions.push(area));

      this.fetchCategory();
    },

    async fetchCategory() {
      if (!this.category) {
        // If properties does not contain category identifier, this means we now
        // are in create mode and we have no need to fetch data from api.
        this.loading = false;
        this.reset();

        return;
      }

      this.loading = true;

      const category = await fetchCategory({
        competition_id: this.cm,
        discipline_id: this.discipline,
        category_group_id: this.group,
        id: this.category
      });

      this.update(category);

      this.loading = false;
    },

    async save() {
      if (this.loading) return;

      this.loading = true;
      this.errors = {};

      this.log("save()", this.form);
      this.formRef.validate(async valid => {
        if (!valid) {
          this.loading = false;
          return false;
        }

        try {
          const category = await saveCategory({
            competition_id: this.cm,
            discipline_id: this.discipline,
            category_group_id: this.group,
            id: this.category,
            ...this.form
          });

          // Notify user that group now is saved sucessfilly.
          this.$notify.success("Category sucessfully saved");

          // emit event to be available update child views.
          emitEvent("cm:category:saved", category);
        } catch (errors) {
          this.errors = errors;
        } finally {
          this.loading = false;
        }
      });
    },

    async destroy() {
      await deleteCategory({
        competition_id: this.cm,
        discipline_id: this.discipline,
        category_group_id: this.group,
        id: this.category
      });

      emitEvent("cm:category:deleted", this.category);
    },

    reset() {
      this.form.area_id = 0;
      this.form.display_type = DisplayType.Max;
      this.form.max = 0;
      this.form.min = 0;
      this.form.short = "";
      this.form.title = "";
    },

    update(category: Category) {
      this.form.area_id = category.area_id;
      this.form.display_type = category.display_type;
      this.form.max = category.max;
      this.form.min = category.min;
      this.form.short = category.short;
      this.form.title = category.title;
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchData();
  },

  watch: {
    cm: "fetchCategory",
    discipline: "fetchCategory",
    group: "fetchCategory",
    category: "fetchCategory"
  }
});
</script>


<template>
  <el-form v-loading="loading"
           :model="form"
           :rules="rules"
           ref="form"
           :label-position="_config.label_position"
           :label-width="_config.label_width"
           @submit.native.prevent="save"
           id="manage-group">

    <el-form-item label="Title"
                  :error="errors.title"
                  prop="title">
      <el-input v-model="form.title"
                type="text"
                name="title"
                placeholder="Title"
                autofocus
                clearable />
    </el-form-item>

    <el-form-item label="Short"
                  :error="errors.short"
                  prop="short">
      <el-input v-model="form.short"
                type="text"
                name="short"
                placeholder="Short"
                clearable />
    </el-form-item>

    <el-form-item label="Area"
                  :error="errors.area_id"
                  prop="area_id">
      <el-select v-model="form.area_id"
                 placeholder="Select">
        <el-option v-for="area in areaOptions"
                   :key="area.id"
                   :label="area.title"
                   :value="area.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Display type"
                  :error="errors.display_type"
                  prop="display_type">
      <el-select v-model="form.display_type"
                 placeholder="Select">
        <el-option v-for="displayType in displayTypeOptions"
                   :key="displayType.key"
                   :label="displayType.label"
                   :value="displayType.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Minimum value"
                  :error="errors.min"
                  prop="min">
      <el-input-number v-model="form.min"
                       controls-position="right"
                       :min="1" />
    </el-form-item>

    <el-form-item label="Maximum value"
                  :error="errors.max"
                  prop="max">
      <el-input-number v-model="form.max"
                       controls-position="right"
                       :min="1" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 native-type="submit">
        Save
      </el-button>

      <el-button v-if="group > 0"
                 type="danger"
                 @click="destroy">
        Delete
      </el-button>
    </el-form-item>
  </el-form>
</template>
