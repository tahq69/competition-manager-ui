<script lang="ts">
import Vue from "vue";
import { Route } from "vue-router";

import { emitEvent } from "@/helpers";
import { createCompetitionDisciplineGroup as createRoute } from "@/router/routes";
import { Id, Next } from "@/typings";

import { Group } from "../../models/group";
import groupService from "../service";

function createPayload(route: Route) {
  return {
    competition_id: route.params.cm,
    discipline_id: route.params.discipline,
    id: route.params.group
  };
}

export default Vue.extend({
  name: "ManageGroupForm",

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    group: { type: [String, Number], required: false }
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    // If we open create route, we have no data to load from API.
    if (to.name === createRoute.name) return next(vm => vm.reset());

    // If we open edit route, we have to load data from API.
    const payload = createPayload(to);

    groupService
      .fetchGroup(payload)
      .then(group => next(vm => vm.update(group)));
  },

  beforeRouteUpdate(to, from, next: Next<any>) {
    // User may have option to change route in runtime. In this case we should
    // update form data.
    if (to.name === createRoute.name) {
      this.reset();
      return next();
    }

    const payload = createPayload(to);
    groupService.fetchGroup(payload).then(group => {
      this.update(group);
      next();
    });
  },

  data() {
    return {
      form: new Group({
        competition_id: this.cm,
        discipline_id: this.discipline,
        max: 0,
        min: 0,
        rounds: 0,
        short: "",
        time: 0,
        title: ""
      })
    };
  },

  methods: {
    async submit() {
      /*this.form.clearErrors();
      try {
        const group = await groupService.saveGroup(this.form.data);
        emitEvent("cm:group:saved", group);
      } catch (errors) {
        this.form.addErrors(errors);
      }*/
    },

    async destroy() {
      await groupService.deleteGroup(this.form);
      emitEvent("cm:group:deleted", this.form.id);
    },

    reset() {
      this.form.competition_id = this.cm;
      this.form.discipline_id = this.discipline;
      this.form.max = 0;
      this.form.min = 0;
      this.form.rounds = 0;
      this.form.short = "";
      this.form.time = 0;
      this.form.title = "";
      this.form.id = 0;
    },

    update(group: Group) {
      this.form.competition_id = group.competition_id;
      this.form.discipline_id = group.discipline_id;
      this.form.max = group.max;
      this.form.min = group.min;
      this.form.rounds = group.rounds;
      this.form.short = group.short;
      this.form.time = group.time;
      this.form.title = group.title;
      this.form.id = group.id;
    }
  }
});
</script>

<template>
  <form submitprevent="submit">
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

    <!-- #rounds -->
    <CFormGroup for="rounds"
                :form="form"
                label="Rounds">
      <input type="number"
             id="rounds"
             name="rounds"
             v-model="form.data.rounds"
             :class="[{'is-invalid': form.errors.rounds}, 'form-control']">
    </CFormGroup>

    <!-- #time -->
    <CFormGroup for="time"
                :form="form"
                label="Round time">
      <input type="number"
             id="time"
             name="time"
             v-model="form.data.time"
             :class="[{'is-invalid': form.errors.time}, 'form-control']">
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
