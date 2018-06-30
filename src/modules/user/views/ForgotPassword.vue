<script lang="ts">
import Vue from "vue";
import { Notification } from "element-ui";
import { ElForm, Rules, Rule } from "@/typings/element-ui";

import { login } from "@/router/routes";
import { required, rule } from "@/helpers/validators";

import userService from "#/user/service";
import { ForgotPassword } from "#/user/models/forgot-password";

export default Vue.extend({
  name: "ForgotPassword",

  mounted() {
    this.$logger.component(this);
  },

  data: () => ({
    form: new ForgotPassword(),
    errors: {},
    loading: false
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules(): Rules<ForgotPassword, keyof ForgotPassword> {
      return {
        email: [
          required("Please input the email address"),
          rule({ type: "email" }, "Please input valid email address")
        ]
      };
    }
  },

  methods: {
    async sendResetEmail() {
      if (this.loading) return;

      this.loading = true;
      this.errors = {};

      this.formRef.validate(async valid => {
        if (!valid) {
          this.loading = false;
          return false;
        }

        try {
          await userService.emailPasswordReset(this.form);

          Notification.success({
            title: "Password reset request sent.",
            message: "Please check yor email to get password reset link"
          });

          this.loading = false;
          this.$router.push(login);
        } catch (errors) {
          this.loading = false;
          this.errors = errors;
        }
      });
    }
  }
});
</script>

<template>
  <el-row>
    <el-col :sm="{ span: 20, offset: 2 }"
            :md="{ span: 16, offset: 4 }"
            :lg="{ span: 12, offset: 6 }">
      <el-card>
        <span slot="header">{{ $t('user.forgotPassword_title') }}</span>
        <el-row v-loading="loading">
          <el-col :md="{ span: 20, offset: 2 }">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     :label-position="_config.label_position"
                     :label-width="_config.label_width"
                     @submit.native.prevent="sendResetEmail">

              <el-form-item :label="$t('user.forgotPassword_email_label')"
                            :error="errors.email"
                            prop="email">
                <el-input v-model="form.email"
                          type="email"
                          name="email"
                          auto-complete="on"
                          :placeholder="$t('user.forgotPassword_email_placeholder')"
                          autofocus
                          clearable />
              </el-form-item>

              <el-form-item>
                <el-button type="primary"
                           native-type="submit">
                  {{ $t('user.forgotPassword_submit_button') }}
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
