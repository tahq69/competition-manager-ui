<template>
  <form-panel
      id="forgot-password"
      @submit="sendResetEmail"
      :form="form"
      :title="$t('user.forgotPassword_title')"
      :body-col-md="10"
      :col-sm="10"
      :col-md="8"
      :col-lg="6"
  >
    <!-- #email -->
    <form-group
        for="email"
        :form="form"
        :label="$t('user.forgotPassword_email_label')"
        :col-sm="8"
    >
      <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          :placeholder="$t('user.forgotPassword_email_placeholder')"
          v-model="form.data.email"
          v-focus="true"
          required
      >
    </form-group>
    
    <!-- #submit -->
    <form-group for="submit" :col-sm="8">
      <button id="submit" type="submit" class="btn btn-primary">
        {{ $t('user.forgotPassword_submit_button') }}
      </button>
    </form-group>
  </form-panel>
</template>

<script lang="ts">
import Form from "@/Components/Forms/Form"
import FormPanel from "@/Components/Forms/FormPanel.vue"
import FormGroup from "@/Components/Forms/FormGroup.vue"
import Focus from "@/Components/Focus"

import store from "@/Store"
import { login } from "@/Router/Routes"

import { IEmailPasswordReset } from "./Store/Contracts"

export default {
  name: "ForgotPassword",

  components: { FormPanel, FormGroup },

  directives: { Focus },

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
          type: "emailPasswordReset",
          email: this.form.data.email,
        })

        // TODO: add notification for user about email has been sent.

        this.$router.push(login)
      } catch (errors) {
        this.form.addErrors(errors)
      }
    },
  },
}
</script>
