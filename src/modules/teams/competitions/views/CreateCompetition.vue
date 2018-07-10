<script lang="ts">
import Vue from "vue";

import { CompetitionCreate } from "#/teams/models/competition-create";
import { manageCmDetailsRoute } from "#/teams/competitions/routes";

import { saveCompetition } from "#/teams/service";

export default Vue.extend({
  name: "CreateTeamCompetitionForm",

  props: {
    team: { type: [String, Number], required: true }
  },

  data() {
    return {
      form: new CompetitionCreate({ team_id: this.team })
    };
  },

  methods: {
    async save() {
      this.log("save()", this.form);

      /*this.form.clearErrors();
      try {
        const cm = await saveCompetition(this.form.data);
        this.$notify.success("Competition created");
        this.$router.push(manageCmDetailsRoute({ cm: cm.id }));
      } catch (errors) {
        this.form.addErrors(errors);
      }*/
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
      <datetime type="datetime"
                name="registration_till"
                id="registration_till"
                v-model="form.data.registration_till"
                :format="_config.dateTimeFormat"
                :class="[{'is-invalid': form.errors.registration_till}, 'form-control']"
                auto/>
    </CFormGroup>

    <!-- #organization_date -->
    <CFormGroup for="organization_date"
                :form="form"
                label="Organization date">
      <datetime type="datetime"
                name="organization_date"
                id="organization_date"
                v-model="form.data.organization_date"
                :format="_config.dateTimeFormat"
                :class="[{'is-invalid': form.errors.organization_date}, 'form-control']"
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
