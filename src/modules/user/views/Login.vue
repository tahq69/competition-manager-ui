<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";
import { ElForm, Rules } from "@/typings";

import Auth, { middleware as auth } from "@/components/auth";
import { required, rule } from "@/helpers/validators";
import { forgotPassword, home } from "@/router/routes";

import { Credentials } from "#/user/models/credentials";

type ServerError = string | null;

export default Vue.extend({
  data: () => ({
    form: new Credentials(),
    serverError: null as ServerError,
    loading: false
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules(): Rules<Credentials> {
      return {
        username: [
          required("Please enter email address"),
          rule({ type: "email" }, "Please enter valid email address")
        ],
        password: [required("Please enter password")]
      };
    },

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
        await Auth.login(this.form);
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
    <el-col :md="{ span: 20, offset: 2 }"
            :lg="{ span: 16, offset: 4 }"
            :xl="{ span: 12, offset: 6 }">
      <el-card>
        <span slot="header">{{ $t('user.login_title') }}</span>
        <el-row v-loading="loading">
          <el-col :lg="{ span: 20, offset: 2 }"
                  :xl="{ span: 16, offset: 4 }">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     :label-position="_config.label_position"
                     :label-width="_config.label_width"
                     @submit.native.prevent="authorize">
              <el-form-item :error="serverError"
                            prop="username">
                <span slot="label" class="a">{{ $t('user.login_email_label') }}</span>
                <el-input v-model="form.username"
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
                  <el-button type="text">
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
