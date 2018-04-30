<script lang="ts">
import Vue from "vue";
import { Form } from "crip-vue-bootstrap";
import { Datetime } from "vue-datetime";

import cmService from "#/competitions/service";
import { Competition } from "#/competitions/models/competition";
import { manageCmDetailsRoute } from "#/competitions/details/routes";

export default Vue.extend({
  name: "CreateTeamCompetitionForm",

  components: { Datetime },

  props: {
    team: { type: [String, Number], required: true }
  },

  data() {
    const cm = new Competition({ team_id: this.team });
    return {
      form: new Form(cm)
    };
  },

  methods: {
    async save() {
      this.log("save()", this.form.data);

      this.form.clearErrors();
      try {
        const cm = await cmService.saveCompetition(this.form.data);
        this.$notice.success({ title: "Competition created" });
        this.$router.push(manageCmDetailsRoute({ cm: cm.id }));
      } catch (errors) {
        this.form.addErrors(errors);
      }
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.log(this._config);
  }
});
</script>

<template>
  <CForm :form="form"
         id="create-team-competition"
         @submit="save"
         class="card-body">

    <!-- #title -->
    <CFormGroup for="title"
                :form="form"
                label="Title">
      <input type="text"
             id="title"
             v-model="form.data.title"
             name="title"
             :class="[{'is-invalid': form.errors.title}, 'form-control']">
    </CFormGroup>

    <!-- #subtitle -->
    <CFormGroup for="subtitle"
                :form="form"
                label="Subtitle">
      <input type="text"
             id="subtitle"
             v-model="form.data.subtitle"
             name="subtitle"
             :class="[{'is-invalid': form.errors.subtitle}, 'form-control']">
    </CFormGroup>

    <!-- #registration_till -->
    <CFormGroup for="registration_till"
                :form="form"
                label="Registration till">
      <datetime v-model="form.data.registration_till"
                :format="_config.dateFormat"
                :class="[{'is-invalid': form.errors.registration_till}, 'form-control']"
                name="registration_till"
                id="registration_till"
                auto/>
    </CFormGroup>

    <!-- #organization_date -->
    <CFormGroup for="organization_date"
                :form="form"
                label="Organization date">
      <datetime v-model="form.data.organization_date"
                :format="_config.dateFormat"
                :class="[{'is-invalid': form.errors.organization_date}, 'form-control']"
                name="organization_date"
                id="organization_date"
                auto/>
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup>
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        Save
      </button>
    </CFormGroup>
  </CForm>
</template>
