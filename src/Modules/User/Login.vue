<template>
  <form-panel
      id="login"
      @submit="authorize"
      :form="form"
      :title="$t('user.login_title')"
      :body-col-md="10"
      :col-sm="10"
      :col-md="8"
      :col-lg="6"
  >

    <!-- #email -->
    <form-group
        for="email"
        :form="form"
        :label="$t('user.login_email_label')"
        :col-sm="8"
    >
      <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          :placeholder="$t('user.login_email_placeholder')"
          v-model="form.data.email"
          v-focus="true"
          required
      >
    </form-group>

    <!-- #password -->
    <form-group
        for="password"
        :label="$t('user.login_password_label')"
        :col-sm="8"
    >
      <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          :placeholder="$t('user.login_password_placeholder')"
          v-model="form.data.password"
          required
      >
    </form-group>

    <!-- #submit -->
    <form-group for="submit" :col-sm="8">
      <button id="submit" type="submit" class="btn btn-primary">
        {{ $t('user.login_submit_button') }}
      </button>

      <router-link :to="forgotPassword" class="btn btn-link">
        {{ $t('user.login_submit_forgot') }}
      </router-link>
    </form-group>
  </form-panel>
</template>

<script lang="ts">
import Focus from "@/Components/Focus"
import Form from "@/Components/Forms/Form"
import FormGroup from "@/Components/Forms/FormGroup.vue"
import FormPanel from "@/Components/Forms/FormPanel.vue"

import Auth, { middleware as auth } from "@/Components/Auth"
import { forgotPassword, home, IRoute } from "@/Router/Routes"

export default {
  name: "Login",

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
        password: "",
      }),
    }
  },

  computed: {
    forgotPassword(): IRoute {
      return forgotPassword
    },
  },

  methods: {
    async authorize() {
      this.$logger.info("authorize", this.form)
      this.form.clearErrors()
      try {
        const credentials = {
          username: this.form.data.email,
          password: this.form.data.password,
        }
        await Auth.login(credentials)
        this.$router.push(home)
      } catch (error) {
        this.form.addErrors({ email: [error] })
      }
    },
  },
}
</script>
