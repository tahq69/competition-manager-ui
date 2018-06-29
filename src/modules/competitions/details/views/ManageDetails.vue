<script lang="ts">
import Vue from "vue";
import { Form } from "crip-vue-bootstrap";

import { Next } from "@/typings";

import { Competition } from "#/competitions/models/competition";
import cmService from "#/competitions/service";

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
      this.log("save()", this.competition.data);

      this.competition.clearErrors();
      try {
        const cm = await cmService.saveCompetition(this.competition.data);
        this.$notify.success("Competition details updated");
      } catch (errors) {
        this.competition.addErrors(errors);
      }
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
      <datetime type="datetime"
                name="registration_till"
                id="registration_till"
                v-model="competition.data.registration_till"
                :format="_config.dateTimeFormat"
                :class="[{'is-invalid': competition.errors.registration_till}, 'form-control']"
                auto/>
    </CFormGroup>

    <!-- #organization_date -->
    <CFormGroup for="organization_date"
                :form="competition"
                label="Organization date"
                :md="9">
      <datetime type="datetime"
                name="organization_date"
                id="organization_date"
                v-model="competition.data.organization_date"
                :format="_config.dateTimeFormat"
                :class="[{'is-invalid': competition.errors.organization_date}, 'form-control']"
                auto/>
    </CFormGroup>

    <!-- #cooperation -->
    <CFormGroup for="cooperation"
                :form="competition"
                label="Cooperation"
                :md="9">
      <textarea id="cooperation"
                v-model="competition.data.cooperation"
                name="cooperation"
                :class="[{'is-invalid': competition.errors.cooperation}, 'form-control']"></textarea>
    </CFormGroup>

    <!-- #invitation -->
    <CFormGroup for="invitation"
                :form="competition"
                label="Invitation"
                :md="9">
      <textarea id="invitation"
                v-model="competition.data.invitation"
                name="invitation"
                :class="[{'is-invalid': competition.errors.invitation}, 'form-control']"></textarea>
    </CFormGroup>

    <!-- #program -->
    <CFormGroup for="program"
                :form="competition"
                label="Program"
                :md="9">
      <textarea id="program"
                v-model="competition.data.program"
                name="program"
                :class="[{'is-invalid': competition.errors.program}, 'form-control']"></textarea>
    </CFormGroup>

    <!-- #rules -->
    <CFormGroup for="rules"
                :form="competition"
                label="Rules"
                :md="9">
      <textarea id="rules"
                v-model="competition.data.rules"
                name="rules"
                :class="[{'is-invalid': competition.errors.rules}, 'form-control']"></textarea>
    </CFormGroup>

    <!-- #ambulance -->
    <CFormGroup for="ambulance"
                :form="competition"
                label="Ambulance"
                :md="9">
      <textarea id="ambulance"
                v-model="competition.data.ambulance"
                name="ambulance"
                :class="[{'is-invalid': competition.errors.ambulance}, 'form-control']"></textarea>
    </CFormGroup>

    <!-- #prizes -->
    <CFormGroup for="prizes"
                :form="competition"
                label="Prizes"
                :md="9">
      <textarea id="prizes"
                v-model="competition.data.prizes"
                name="prizes"
                :class="[{'is-invalid': competition.errors.prizes}, 'form-control']"></textarea>
    </CFormGroup>

    <!-- #equipment -->
    <CFormGroup for="equipment"
                :form="competition"
                label="Equipment"
                :md="9">
      <textarea id="equipment"
                v-model="competition.data.equipment"
                name="equipment"
                :class="[{'is-invalid': competition.errors.equipment}, 'form-control']"></textarea>
    </CFormGroup>

    <!-- #price -->
    <CFormGroup for="price"
                :form="competition"
                label="Price"
                :md="9">
      <textarea id="price"
                v-model="competition.data.price"
                name="price"
                :class="[{'is-invalid': competition.errors.price}, 'form-control']"></textarea>
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
