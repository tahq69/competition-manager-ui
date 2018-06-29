<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { ElForm } from "@/typings/element-ui";
import Auth, { middleware as auth } from "@/components/auth";
import { forgotPassword, home } from "@/router/routes";

type ServerError = string | null;

export default Vue.extend({
  name: "Login",

  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      serverError: null as ServerError,
      loading: false
    };
  },

  computed: {
    forgotPassword(): Location {
      return forgotPassword;
    }
  },

  methods: {
    async authorize() {
      this.$logger.info("authorize", this.form);
      this.serverError = null;
      this.loading = true;

      try {
        const credentials = {
          username: this.form.email,
          password: this.form.password
        };

        await Auth.login(credentials);
        this.loading = false;
        this.$router.push(home);
      } catch (error) {
        this.$logger.info("authorize", { error });
        this.serverError = error;
        this.loading = false;
      }
    }
  },

  created() {
    this.log = this.$logger.component(this);

    if (auth.isAuthenticated()) {
      this.log("User is authenticated. Redirecting to homepage.");
      this.$router.push(home);
    }
  }
});
</script>

<template>
  <el-row>
    <el-col :sm="{ span: 20, offset: 2 }"
            :md="{ span: 16, offset: 4 }"
            :lg="{ span: 12, offset: 6 }"
            :xl="{ span: 10, offset: 7 }">
      <el-card v-loading="loading">
        <span slot="header">{{ $t('user.login_title') }}</span>
        <el-row>
          <el-col :md="{ span: 20, offset: 2 }">
            <el-form :model="form"
                     ref="form"
                     :label-position="_config.label_position"
                     :label-width="_config.label_width"
                     @submit.native.prevent="authorize">
              <el-form-item :label="$t('user.login_email_label')"
                            :error="serverError"
                            prop="email">
                <el-input v-model="form.email"
                          type="email"
                          name="email"
                          auto-complete="on"
                          :placeholder="$t('user.login_email_placeholder')"
                          autofocus
                          clearable />
              </el-form-item>

              <el-form-item :label="$t('user.login_password_label')"
                            prop="password">
                <el-input v-model="form.password"
                          type="password"
                          name="password"
                          auto-complete="on"
                          :placeholder="$t('user.login_password_placeholder')"
                          autofocus
                          clearable />
              </el-form-item>

              <el-form-item>
                <el-button type="primary"
                           native-type="submit">
                  {{ $t('user.login_submit_button') }}
                </el-button>
                <router-link :to="forgotPassword">
                  <el-button>
                    {{ $t('user.login_submit_forgot') }}
                  </el-button>
                </router-link>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
