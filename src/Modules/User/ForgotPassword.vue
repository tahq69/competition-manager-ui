<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import Vue from "vue"

import { login } from "@/Router/Routes"
import { store } from "@/Store"

import { IEmailPasswordReset } from "./Store/types"

export default Vue.extend({
  name: "ForgotPassword",

  mounted() {
    this.$logger.component(this)
  },

  data() {
    return {
      form: new Form({
        email: "",
      }),
    }
  },

  methods: {
    async sendResetEmail() {
      this.form.clearErrors()

      this.$logger.log("sendResetEmail", this.form)

      try {
        await store.dispatch<IEmailPasswordReset>({
          email: this.form.data.email,
          type: "emailPasswordReset",
        })

        // TODO: add notification for user about email has been sent.

        this.$router.push(login)
      } catch (errors) {
        this.form.addErrors(errors)
      }
    },
  },
})
</script>

<template>
  <CFormPanel id="forgot-password"
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
  </CFormPanel>
</template>
