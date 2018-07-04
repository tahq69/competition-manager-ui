<script lang="ts">
import Vue from "vue";
import { Route } from "vue-router";

import { emitEvent } from "@/helpers";
import { createCompetitionDisciplineCategory as createRoute } from "@/router/routes";
import { Id, Next } from "@/typings";

import areaService from "../../areas/service";
import { Area } from "../../models/area";

import { Category, DisplayType } from "../../models/category";
import { Group } from "../../models/group";
import groupService from "../service";

function createPayload(route: Route) {
  return {
    competition_id: route.params.cm,
    discipline_id: route.params.discipline,
    category_group_id: route.params.group,
    id: route.params.category
  };
}

export default Vue.extend({
  name: "ManageCategoryForm",

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    group: { type: [String, Number], required: true },
    category: { type: [String, Number], required: false }
  },

  async beforeRouteEnter(to, from, next: Next<any>) {
    const areas = await areaService.fetchAreas({
      competition_id: to.params.cm
    });
    const opt = areas.map(area => ({
      key: area.id,
      text: area.title,
      value: area.id
    }));

    // If we open create route, we have no data to load from API.
    if (to.name === createRoute.name)
      return next(vm => {
        vm.setAreas(opt);
        vm.reset();
      });

    // If we open edit route, we have to load data from API.
    const payload = createPayload(to);
    const category = await groupService.fetchCategory(payload);

    next(vm => {
      vm.setAreas(opt);
      vm.setCategory(category);
    });
  },

  async beforeRouteUpdate(to, from, next) {
    // User may have option to change route in runtime. In this case we should
    // update form data.
    if (to.name === createRoute.name) {
      this.reset();
      return next();
    }

    const payload = createPayload(to);
    const category = await groupService.fetchCategory(payload);
    this.setCategory(category);
    next();
  },

  data() {
    return {
      form: new Category({
        area_id: 0,
        category_group_id: this.group,
        competition_id: this.cm,
        discipline_id: this.discipline,
        display_type: DisplayType.Max,
        id: 0,
        max: 0,
        min: 0,
        short: "",
        title: ""
      })

      /*areaSelect: new CripSelect({}),

      displayTypeSelect: new CripSelect([
        { key: "1", text: "Maximum", value: DisplayType.Max },
        { key: "2", text: "Minimum", value: DisplayType.Min },
        { key: "3", text: "Both", value: DisplayType.Both }
      ])*/
    };
  },

  methods: {
    async submit() {
      /*this.form.clearErrors();
      try {
        const category = await groupService.saveCategory(this.form.data);
        emitEvent("cm:category:saved", category);
      } catch (errors) {
        this.form.addErrors(errors);
      }*/
    },

    async destroy() {
      await groupService.deleteCategory(this.form);
      emitEvent("cm:category:deleted", this.form.id);
    },

    reset() {
      this.form.area_id = 0;
      this.form.category_group_id = this.group;
      this.form.competition_id = this.cm;
      this.form.discipline_id = this.discipline;
      this.form.display_type = DisplayType.Max;
      this.form.id = 0;
      this.form.max = 0;
      this.form.min = 0;
      this.form.short = "";
      this.form.title = "";
    },

    setCategory(category: Category) {
      this.form.area_id = category.area_id;
      this.form.category_group_id = category.category_group_id;
      this.form.competition_id = category.competition_id;
      this.form.discipline_id = category.discipline_id;
      this.form.display_type = category.display_type;
      this.form.id = category.id;
      this.form.max = category.max;
      this.form.min = category.min;
      this.form.short = category.short;
      this.form.title = category.title;
    },

    setAreas(options: any[]) {
      /*this.areaSelect.addOption(options);*/
    }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>


<template>
  <form @submit.prevent="submit">
    <!-- #title -->
    <CFormGroup for="title"
                :form="form"
                label="Full title">
      <input type="text"
             id="title"
             name="title"
             v-model="form.data.title"
             :class="[{'is-invalid': form.errors.title}, 'form-control']">
    </CFormGroup>

    <!-- #short -->
    <CFormGroup for="short"
                :form="form"
                label="Short title">
      <input type="text"
             id="short"
             name="short"
             v-model="form.data.short"
             :class="[{'is-invalid': form.errors.short}, 'form-control']">
    </CFormGroup>

    <CFormGroup for="area"
                :form="form"
                label="Area">
      <crip-select id="area"
                   :settings="areaSelect"
                   v-model="form.data.area_id"
                   :class="{'is-invalid': form.errors.area_id}" />
    </CFormGroup>

    <CFormGroup for="display-type"
                :form="form"
                label="Display type">
      <crip-select id="display-type"
                   :settings="displayTypeSelect"
                   v-model="form.data.display_type"
                   :class="{'is-invalid': form.errors.display_type}" />
    </CFormGroup>

    <!-- #min -->
    <CFormGroup for="min"
                :form="form"
                label="Minimum value">
      <input type="number"
             id="min"
             name="min"
             v-model="form.data.min"
             :class="[{'is-invalid': form.errors.min}, 'form-control']">
    </CFormGroup>

    <!-- #max -->
    <CFormGroup for="max"
                :form="form"
                label="Maximum value">
      <input type="number"
             id="max"
             name="max"
             v-model="form.data.max"
             :class="[{'is-invalid': form.errors.max}, 'form-control']">
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup>
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        Save
      </button>

      <button v-if="form.data.id > 0"
              type="button"
              @click="destroy"
              class="btn btn-danger">
        Delete
      </button>
    </CFormGroup>
  </form>
</template>
