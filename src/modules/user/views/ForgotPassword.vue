<script lang="ts">
import Vue from "vue";
import { Form } from "crip-vue-bootstrap";

import { login } from "@/router/routes";

import userService from "./../service";

export default Vue.extend({
  name: "ForgotPassword",

  mounted() {
    this.$logger.component(this);
  },

  data() {
    return {
      form: new Form({
        email: ""
      })
    };
  },

  methods: {
    async sendResetEmail() {
      this.form.clearErrors();

      this.$logger.log("sendResetEmail", this.form);

      try {
        await userService.emailPasswordReset(this.form.data);

        Vue.notice.info({
          title: "Password reset request sent.",
          description: "Please check yor email to get password reset link"
        });

        this.$router.push(login);
      } catch (errors) {
        this.form.addErrors(errors);
      }
    }
  }
});
</script>

<template>
  <CFormCard id="forgot-password"
             @submit="sendResetEmail"
             :form="form"
             :title="$t('user.forgotPassword_title')"
             :body-md="10"
             :sm="10"
             :md="8"
             :lg="6">
    <!-- #email -->
    <CFormGroup for="email"
                :form="form"
                :label="$t('user.forgotPassword_email_label')"
                :md="8"
                :sm="8">
      <input type="email"
             id="email"
             name="email"
             class="form-control"
             :placeholder="$t('user.forgotPassword_email_placeholder')"
             v-model="form.data.email"
             v-c-focus="true"
             required>
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup for="submit"
                :md="8"
                :sm="8">
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        {{ $t('user.forgotPassword_submit_button') }}
      </button>
    </CFormGroup>
  </CFormCard>
</template>
