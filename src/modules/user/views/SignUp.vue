<script lang="ts">
import Vue from "vue";
import { ElForm, Rules, Rule } from "@/typings";

import Auth, { middleware } from "@/components/auth";
import { required, rule, validate } from "@/helpers/validators";
import { home } from "@/router/routes";

import { SignUp } from "#/user/models/sign-up";

export default Vue.extend({
  name: "SignUp",

  data: () => ({
    form: new SignUp(),
    errors: {},
    loading: false
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules(): Rules<SignUp> {
      return {
        email: [
          required("Please input the email address"),
          rule({ type: "email" }, "Please input valid email address")
        ],
        name: [required("Please input the name")],
        password: this.passwordRules,
        password_confirmation: this.passwordConfirmationRules
      };
    },

    passwordRules(): Rule[] {
      return [
        required("Please input the password"),
        rule({ min: 6 }, "Password should be at least 6 characters"),
        validate((rule, value, callback) => {
          // validate password confirmation field if it already has a value.
          if (this.form.password_confirmation !== "")
            this.formRef.validateField("password_confirmation", _ => _);

          callback();
        })
      ];
    },

    passwordConfirmationRules(): Rule[] {
      return [
        required("Please input the password again"),
        validate<string>((rule, value, callback) => {
          if (value !== this.form.password)
            callback(new Error("Passwords don't match"));
          else callback();
        })
      ];
    }
  },

  methods: {
    async signUp() {
      if (this.loading) return;

      this.loading = true;
      this.errors = {};

      this.formRef.validate(async valid => {
        if (!valid) {
          this.loading = false;
          return false;
        }

        try {
          await Auth.register(this.form);

          this.loading = false;
          this.$router.push(home);
        } catch (errors) {
          this.loading = false;
          this.errors = errors;
        }
      });
    }
  },

  created() {
    this.log = this.$logger.component(this);

    if (middleware.isAuthenticated()) {
      this.log("User already authentificated. Redirecting to home page.");
      this.$router.push(home);
    }
  }
});
</script>

<template>
  <el-row>
    <el-col :md="{ span: 20, offset: 2 }"
            :lg="{ span: 16, offset: 4 }">
      <el-card>
        <span slot="header">{{ $t('user.signUp_title') }}</span>
        <el-row v-loading="loading">
          <el-col :md="{ span: 20, offset: 2 }">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     :label-position="_config.label_position"
                     :label-width="_config.label_width"
                     @submit.native.prevent="signUp">
              <el-form-item :label="$t('user.signUp_name_label')"
                            :error="errors.name"
                            prop="name">
                <el-input v-model="form.name"
                          type="text"
                          name="name"
                          auto-complete="on"
                          :placeholder="$t('user.signUp_name_placeholder')"
                          autofocus
                          clearable />
              </el-form-item>

              <el-form-item :label="$t('user.signUp_email_label')"
                            :error="errors.email"
                            prop="email">
                <el-input v-model="form.email"
                          type="email"
                          name="email"
                          auto-complete="on"
                          :placeholder="$t('user.signUp_email_placeholder')"
                          clearable />
              </el-form-item>

              <el-form-item :label="$t('user.signUp_password_label')"
                            :error="errors.password"
                            prop="password">
                <el-input v-model="form.password"
                          type="password"
                          name="password"
                          auto-complete="on"
                          :placeholder="$t('user.signUp_password_placeholder')"
                          clearable />
              </el-form-item>

              <el-form-item :label="$t('user.signUp_password_confirmation_label')"
                            :error="errors.password_confirmation"
                            prop="password_confirmation">
                <el-input v-model="form.password_confirmation"
                          type="password"
                          name="password_confirmation"
                          auto-complete="on"
                          :placeholder="$t('user.signUp_password_confirmation_placeholder')"
              
                          clearable />
              </el-form-item>

              <el-form-item>
                <el-button type="primary"
                           native-type="submit">
                  {{ $t('user.signUp_submit_button') }}
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
