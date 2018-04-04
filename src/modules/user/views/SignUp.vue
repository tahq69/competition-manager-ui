<script lang="ts">
import { Form } from "crip-vue-bootstrap";
import Vue from "vue";

import Auth, { middleware } from "@/components/auth";
import { home } from "@/router/routes";

import { SignUp } from "./../models/sign-up";

export default Vue.extend({
  name: "SignUp",

  data: () => ({ form: new Form(new SignUp()) }),

  methods: {
    async signUp() {
      this.form.clearErrors();
      try {
        await Auth.register(this.form.data);

        this.$router.push(home);
      } catch (errors) {
        this.form.addErrors(errors);
      }
    }
  },

  created() {
    this.log = this.$logger.component(this);

    if (middleware.isAuthenticated()) {
      this.log("User already authentificated. Redirecting to home page.");
      this.$router.push(home);
    }
  }
});
</script>

<template>
  <CFormCard id="signup"
             @submit="signUp"
             :form="form"
             :title="$t('user.signUp_title')"
             :body-md="10"
             :md="10"
             :lg="8">
    <!-- #name -->
    <CFormGroup for="name"
                :form="form"
                :label="$t('user.signUp_name_label')"
                :md="8"
                :sm="8">
      <input type="text"
             id="name"
             name="name"
             autocomplete="name"
             class="form-control"
             :placeholder="$t('user.signUp_name_placeholder')"
             v-model="form.data.name"
             v-c-focus="true"
             required>
    </CFormGroup>

    <!-- #email -->
    <CFormGroup for="email"
                :form="form"
                :label="$t('user.signUp_email_label')"
                :md="8"
                :sm="8">
      <input type="email"
             id="email"
             name="email"
             autocomplete="email"
             class="form-control"
             :placeholder="$t('user.signUp_email_placeholder')"
             v-model="form.data.email"
             required>
    </CFormGroup>

    <!-- #password -->
    <CFormGroup for="password"
                :form="form"
                :label="$t('user.signUp_password_label')"
                :md="8"
                :sm="8">
      <input type="password"
             id="password"
             name="password"
             autocomplete="new-password"
             class="form-control"
             :placeholder="$t('user.signUp_password_placeholder')"
             v-model="form.data.password"
             required>
    </CFormGroup>

    <!-- #password_confirmation -->
    <CFormGroup for="password_confirmation"
                :form="form"
                :label="$t('user.signUp_password_confirmation_label')"
                :md="8"
                :sm="8">
      <input type="password"
             id="password_confirmation"
             name="password_confirmation"
             autocomplete="new-password"
             class="form-control"
             :placeholder="$t('user.signUp_password_confirmation_placeholder')"
             v-model="form.data.password_confirmation"
             required>
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup for="submit"
                :md="8"
                :sm="8">
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        {{ $t('user.signUp_submit_button') }}
      </button>
    </CFormGroup>
  </CFormCard>
</template>
