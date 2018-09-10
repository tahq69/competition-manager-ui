<script lang="ts">
import Vue from "vue";
import { Notification } from "element-ui";

import { ElForm, Rules } from "@/typings";
import { onEvent, offEvent } from "@/helpers";
import { required } from "@/helpers/validators";

import { ReplyMessage } from "@/modules/user/models";
import { replyOnMessage } from "@/modules/user/service";

export default Vue.extend({
  name: "ReplyMessage",

  props: {
    id: { type: [String, Number], required: true },
    subject: { type: String, default: "" }
  },

  data: () => ({
    loading: false,
    form: new ReplyMessage(),
    errors: {}
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules(): Rules<ReplyMessage> {
      return {
        subject: [required("Please input the reply subject")],
        body: [required("Please input the message body")]
      };
    }
  },

  methods: {
    async sendReply() {
      this.log(this.form);
      if (this.loading) return;

      this.loading = true;
      this.errors = {};

      this.formRef.validate(async valid => {
        if (!valid) {
          this.loading = false;
          return false;
        }

        try {
          const msg = await replyOnMessage({ ...this.form, id: this.id });

          Notification.success({
            title: "Reply message sent.",
            message: `${msg.to_name} received your reply message`
          });

          this.loading = false;
          this.$emit("sent");
        } catch (errors) {
          this.loading = false;
          this.errors = errors;
          this.$emit("error");
        }
      });
    }
  },

  created() {
    this.log = this.$logger.component(this);
    onEvent("message:reply", this.sendReply);
  },

  mounted() {
    if (this.subject) {
      this.form.subject = this.subject;
    }
  },

  beforeDestroy() {
    offEvent("message:reply", this.sendReply);
  }
});
</script>

<template>
  <el-form v-loading="loading"
           :model="form"
           :rules="rules"
           ref="form"
           @submit.native.prevent="sendReply">
    <el-form-item :error="errors.subject"
                  prop="subject">
      <el-input v-model="form.subject"
                placeholder="Subject"
                autofocus
                clearable />
    </el-form-item>

    <el-form-item :error="errors.body"
                  prop="body">
      <el-input v-model="form.body"
                type="textarea" />
    </el-form-item>
  </el-form>
</template>
