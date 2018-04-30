<script lang="ts">
import Vue from "vue";
import { Form } from "crip-vue-bootstrap";

import { Next } from "@/typings";

import { Competition } from "@/modules/competitions/models/competition";
import cmService from "@/modules/competitions/service";

export default Vue.extend({
  name: "ManageCompetitionDetails",

  props: {
    cm: { type: [Number, String], required: true }
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    cmService
      .fetchCompetition({ id: to.params.cm })
      .then(competition => next(vm => vm.init(competition)));
  },

  data: () => ({
    competition: new Form(new Competition({}))
  }),

  methods: {
    init(competition: Competition) {
      this.competition = new Form(competition);
    },

    async save() {
      this.log(this.competition.data);
    }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <CForm :form="competition"
         id="manage-competition"
         @submit="save">

    <!-- #title -->
    <CFormGroup for="title"
                :form="competition"
                label="Title"
                :md="9">
      <input type="text"
             id="title"
             v-model="competition.data.title"
             name="title"
             :class="[{'is-invalid': competition.errors.title}, 'form-control']">
    </CFormGroup>

    <!-- #subtitle -->
    <CFormGroup for="subtitle"
                :form="competition"
                label="Subtitle"
                :md="9">
      <input type="text"
             id="subtitle"
             v-model="competition.data.subtitle"
             name="subtitle"
             :class="[{'is-invalid': competition.errors.subtitle}, 'form-control']">
    </CFormGroup>

    <!-- #registration_till -->
    <CFormGroup for="registration_till"
                :form="competition"
                label="Registration till"
                :md="9">
      <datetime v-model="competition.data.registration_till"
                :format="_config.dateFormat"
                :class="[{'is-invalid': competition.errors.registration_till}, 'form-control']"
                name="registration_till"
                id="registration_till"
                auto/>
    </CFormGroup>

    <!-- #organization_date -->
    <CFormGroup for="organization_date"
                :form="competition"
                label="Organization date"
                :md="9">
      <datetime v-model="competition.data.organization_date"
                :format="_config.dateFormat"
                :class="[{'is-invalid': competition.errors.organization_date}, 'form-control']"
                name="organization_date"
                id="organization_date"
                auto/>
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup :md="9">
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        Save
      </button>
    </CFormGroup>
  </CForm>
</template>
