<script lang="ts">
import Vue from "vue";
import { Notification } from "element-ui";
import { ElForm, Rules, Rule } from "@/typings";

import { login } from "@/router/routes";
import { required, rule, validate } from "@/helpers/validators";

import { resetPassword } from "@/modules/user/service";
import { ResetPassword } from "@/modules/user/models";

export default Vue.extend({
  name: "ResetPassword",

  props: {
    token: { type: String, required: true }
  },

  data: () => ({
    form: new ResetPassword(),
    errors: {},
    loading: false
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules(): Rules<ResetPassword> {
      return {
        email: [
          required("Please input the email address"),
          rule({ type: "email" }, "Please input valid email address")
        ],
        password: this.passwordRules,
        password_confirmation: this.passwordConfirmationRules
      };
    },

    passwordRules(): Rule<string>[] {
      return [
        required("Please input the password"),
        rule({ min: 6 }, "Password should be at least 6 characters"),
        validate<string>((rule, value, callback) => {
          // validate password confirmation field if it already has a value.
          if (this.form.password_confirmation !== "")
            this.formRef.validateField("password_confirmation", _ => _);

          callback();
        })
      ];
    },

    passwordConfirmationRules(): Rule<string>[] {
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
    async resetPassword() {
      if (this.loading) return;

      this.errors = {};

      this.formRef.validate(async valid => {
        if (!valid) return false;

        try {
          this.loading = true;

          const details = Object.assign({}, this.form, { token: this.token });
          const message = await resetPassword(details);

          Notification.info(message);

          this.loading = false;
          this.$router.push(login);
        } catch (errors) {
          this.loading = false;
          this.errors = errors;
        }
      });
    }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <el-row>
    <el-col :md="{ span: 20, offset: 2 }"
            :lg="{ span: 16, offset: 4 }">
      <el-card>
        <span slot="header">Reset password</span>
        <el-row v-loading="loading">
          <el-col :md="{ span: 20, offset: 2 }">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     :label-position="_config.label_position"
                     :label-width="_config.label_width"
                     @submit.native.prevent="resetPassword">

              <el-form-item label="Email"
                            :error="errors.email"
                            prop="email">
                <el-input v-model="form.email"
                          type="email"
                          name="email"
                          placeholder="Please enter email address"
                          autofocus
                          clearable />
              </el-form-item>

              <el-form-item label="Password"
                            :error="errors.password"
                            prop="password">
                <el-input v-model="form.password"
                          type="password"
                          name="password"
                          placeholder="Please enter your new password"
                          clearable />
              </el-form-item>

              <el-form-item label="Password confirmation"
                            :error="errors.password_confirmation"
                            prop="password_confirmation">
                <el-input v-model="form.password_confirmation"
                          type="password"
                          name="password_confirmation"
                          auto-complete="on"
                          placeholder="Please enter your new password again"
                          clearable />
              </el-form-item>

              <el-form-item>
                <el-button type="primary"
                           native-type="submit">
                  Reset password
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
