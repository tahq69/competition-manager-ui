<script lang="ts">
import Vue from "vue";
import { ElForm, Rules, Rule } from "@/typings";

import { required } from "@/helpers/validators";

import { cmDetailsRoute } from "@/modules/competitions/routes";

import { CreateCompetition } from "@/modules/teams/models";
import { saveCompetition } from "@/modules/teams/service";

export default Vue.extend({
  name: "CreateCompetition",

  props: {
    team: { type: [String, Number], required: true }
  },

  data: () => ({
    loading: false,
    form: new CreateCompetition(),
    errors: {}
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules: (): Rules<CreateCompetition> => ({
      organization_date: [required("Please input the organization date")],
      registration_till: [
        required("Please input the date when registration become unavailable")
      ],
      subtitle: [required("Please input the subtitle")],
      title: [required("Please input the title")]
    })
  },

  methods: {
    async save() {
      if (this.loading) return;

      this.loading = true;
      this.errors = {};

      this.formRef.validate(async valid => {
        if (!valid) {
          this.loading = false;
          return false;
        }

        try {
          const competition = await saveCompetition({
            ...this.form,
            team_id: this.team
          });

          this.$notify.success("Competition created");

          const viewDetails = cmDetailsRoute({ cm: competition.id });
          this.$router.push(viewDetails);
        } catch (errors) {
          this.loading = false;
          this.errors = errors;
        }
      });
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.log(this._config /*.dateTimeFormat*/);
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
           @submit.native.prevent="save">

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

    <el-form-item label="Subtitle"
                  :error="errors.subtitle"
                  prop="subtitle">
      <el-input v-model="form.subtitle"
                type="text"
                name="subtitle"
                placeholder="Subtitle"
                clearable />
    </el-form-item>

    <el-form-item label="Registration till"
                  :error="errors.registration_till"
                  prop="registration_till">
      <el-date-picker v-model="form.registration_till"
                      id="registration_till"
                      name="registration_till"
                      type="datetime"
                      placeholder="Select date and time" />
    </el-form-item>

    <el-form-item label="Organization date"
                  :error="errors.organization_date"
                  prop="organization_date">
      <el-date-picker v-model="form.organization_date"
                      id="organization_date"
                      name="organization_date"
                      type="datetime"
                      placeholder="Select date and time" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 native-type="submit">
        Save
      </el-button>
    </el-form-item>
  </el-form>
</template>
