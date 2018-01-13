<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import Vue from "vue"

import Auth, { middleware as auth } from "@/Components/Auth"
import { home } from "@/Router/Routes"
import { store } from "@/Store"

import { IRegister } from "./Store/types"

export default Vue.extend({
  name: "SignUp",

  mounted() {
    this.$logger.component(this)

    if (auth.isAuthenticated()) {
      this.$router.push(home)
    }
  },

  data() {
    return {
      form: new Form({
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
      }),
    }
  },

  methods: {
    async signUp() {
      this.form.clearErrors()
      try {
        await store.dispatch<IRegister>({
          type: "register",
          ...this.form.data,
        })

        await Auth.login({
          password: this.form.data.password,
          username: this.form.data.email,
        })

        this.$router.push(home)
      } catch (errors) {
        this.form.addErrors(errors)
      }
    },
  },
})
</script>

<template>
  <CFormPanel id="signup"
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
  </CFormPanel>
</template>
