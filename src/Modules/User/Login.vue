<script lang="ts">
import { Form } from "crip-vue-bootstrap"
import Vue from "vue"
import { Location } from "vue-router"

import Auth, { middleware as auth } from "@/Components/Auth"
import { forgotPassword, home } from "@/Router/Routes"

export default Vue.extend({
  name: "Login",

  mounted() {
    this.log = this.$logger.component(this)

    if (auth.isAuthenticated()) {
      this.log("User is authenticated. Redirecting to homepage.")
      this.$router.push(home)
    }
  },

  data() {
    return {
      form: new Form({
        email: "",
        password: "",
      }),
    }
  },

  computed: {
    forgotPassword(): Location {
      return forgotPassword as Location
    },
  },

  methods: {
    async authorize() {
      this.$logger.info("authorize", this.form)
      this.form.clearErrors()
      try {
        const credentials = {
          password: this.form.data.password,
          username: this.form.data.email,
        }
        await Auth.login(credentials)
        this.$router.push(home)
      } catch (error) {
        this.form.addErrors({ email: [error] })
      }
    },
  },
})
</script>

<template>
  <CFormPanel id="login"
              @submit="authorize"
              :form="form"
              :title="$t('user.login_title')"
              :body-md="10"
              :sm="10"
              :md="8"
              :lg="6">

    <!-- #email -->
    <CFormGroup for="email"
                :form="form"
                :label="$t('user.login_email_label')"
                :md="8"
                :sm="8">
      <input type="email"
             id="email"
             name="email"
             class="form-control"
             :placeholder="$t('user.login_email_placeholder')"
             v-model="form.data.email"
             v-c-focus="true"
             required>
    </CFormGroup>

    <!-- #password -->
    <CFormGroup for="password"
                :label="$t('user.login_password_label')"
                :md="8"
                :sm="8">
      <input type="password"
             id="password"
             name="password"
             class="form-control"
             :placeholder="$t('user.login_password_placeholder')"
             v-model="form.data.password"
             required>
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup for="submit"
                :md="8"
                :sm="8">
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        {{ $t('user.login_submit_button') }}
      </button>

      <router-link :to="forgotPassword"
                   class="btn btn-link">
        {{ $t('user.login_submit_forgot') }}
      </router-link>
    </CFormGroup>
  </CFormPanel>
</template>
