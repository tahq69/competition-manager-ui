<template>
  <form-panel
      id="login"
      @submit="authorize"
      :form="form"
      :title="$t('auth.login_title')"
      :body-col-md="10"
      :col-sm="10"
      :col-md="8"
      :col-lg="6"
  >

    <!-- #email -->
    <form-group
        for="email"
        :form="form"
        :label="$t('auth.login_email_label')"
        :col-sm="8"
    >
      <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          :placeholder="$t('auth.login_email_placeholder')"
          v-model="form.data.email"
          v-focus="true"
          required
      >
    </form-group>

    <!-- #password -->
    <form-group
        for="password"
        :label="$t('auth.login_password_label')"
        :col-sm="8"
    >
      <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          :placeholder="$t('auth.login_password_placeholder')"
          v-model="form.data.password"
          required
      >
    </form-group>

    <!-- #submit -->
    <form-group for="submit" :col-sm="8">
      <button id="submit" type="submit" class="btn btn-primary">
        {{ $t('auth.login_submit_button') }}
      </button>

      <router-link :to="forgotPassword" class="btn btn-link">
        {{ $t('auth.login_submit_forgot') }}
      </router-link>
    </form-group>
  </form-panel>
</template>

<script lang="ts">
import Form from '@/Components/Forms/Form'
import FormPanel from '@/Components/Forms/FormPanel.vue'
import FormGroup from '@/Components/Forms/FormGroup.vue'
import Focus from '@/Components/Focus'
import {forgotPassword, home, Route} from '@/Router/Routes'
import Auth, { middleware as auth } from '@/Components/Auth'

export default {
  name: 'Login',

  components: {FormPanel, FormGroup},

  directives: {Focus},

  data() {
    return {
      form: new Form({
        email: '',
        password: '',
      })
    }
  },

  computed: {
    forgotPassword(): Route {
      return forgotPassword
    },
  },

  mounted() {
    this.$logger.component(this)

    if (auth.isAuthenticated()) {
      this.$router.push(home)
    }
  },

  methods: {
    async authorize() {
      this.$logger.info('authorize', this.form)
      this.form.clearErrors()
      try {
        const credentials = {
          username: this.form.data.email,
          password: this.form.data.password,
        }
        await Auth.login(credentials)
        this.$router.push(home)
      } catch (error) {
        this.form.addErrors({email: [error]})
      }
    }
  }
}
</script>
