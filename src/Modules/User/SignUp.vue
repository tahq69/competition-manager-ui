<script lang="ts">
import Focus from "@/Components/Focus"
import Form from "@/Components/Forms/Form"
import FormGroup from "@/Components/Forms/FormGroup.vue"
import FormPanel from "@/Components/Forms/FormPanel.vue"

import Auth, { middleware as auth } from "@/Components/Auth"
import { home } from "@/Router/Routes"
import store from "@/Store"

import { IRegister } from "./Store/Contracts"

import Vue from "vue"

export default Vue.extend({
  name: "SignUp",

  components: { FormPanel, FormGroup },

  directives: { Focus },

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
  <form-panel id="signup"
              @submit="signUp"
              :form="form"
              :title="$t('user.signUp_title')"
              :body-col-md="10"
              :col-md="10"
              :col-lg="8">
    <!-- #name -->
    <form-group for="name"
                :form="form"
                :label="$t('user.signUp_name_label')"
                :col-sm="8">
      <input type="text"
             id="name"
             name="name"
             class="form-control"
             :placeholder="$t('user.signUp_name_placeholder')"
             v-model="form.data.name"
             v-focus="true"
             required>
    </form-group>

    <!-- #email -->
    <form-group for="email"
                :form="form"
                :label="$t('user.signUp_email_label')"
                :col-sm="8">
      <input type="email"
             id="email"
             name="email"
             class="form-control"
             :placeholder="$t('user.signUp_email_placeholder')"
             v-model="form.data.email"
             required>
    </form-group>

    <!-- #password -->
    <form-group for="password"
                :form="form"
                :label="$t('user.signUp_password_label')"
                :col-sm="8">
      <input type="password"
             id="password"
             name="password"
             class="form-control"
             :placeholder="$t('user.signUp_password_placeholder')"
             v-model="form.data.password"
             required>
    </form-group>

    <!-- #password_confirmation -->
    <form-group for="password_confirmation"
                :form="form"
                :label="$t('user.signUp_password_confirmation_label')"
                :col-sm="8">
      <input type="password"
             id="password_confirmation"
             name="password_confirmation"
             class="form-control"
             :placeholder="$t('user.signUp_password_confirmation_placeholder')"
             v-model="form.data.password_confirmation"
             required>
    </form-group>

    <!-- #submit -->
    <form-group for="submit"
                :col-sm="8">
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        {{ $t('user.signUp_submit_button') }}
      </button>
    </form-group>
  </form-panel>
</template>