<script lang="ts">
import Vue from "vue";
import { Notification } from "element-ui";

import { ElForm, Rules, SortDirection } from "@/typings";
import { searchUser, emitEvent } from "@/helpers";
import { required } from "@/helpers/validators";

import { sendMessage } from "@/modules/user/service";
import { messagesRoute } from "@/modules/user/routes";
import { MessagesType } from "@/modules/user/typings";
import { CreateMessage } from "@/modules/user/models";

const validator = (page: string | number) => parseInt(page.toString()) > 0;
const directions = ["ascending", "descending"];

export default Vue.extend({
  name: "CreateMessage",

  props: {
    type: { type: String, required: true },
    page: { type: [String, Number], required: true, validator },
    pageSize: { type: [String, Number], default: 10, validator },
    sort: { type: String, default: "id" },
    direction: {
      type: String,
      default: "descending",
      validator: (val: string) => directions.indexOf(val) > -1
    }
  },

  data: () => ({
    loading: false,
    form: new CreateMessage(),
    errors: {},
    foundUsers: [] as any[],
    selectedUser: {} as any,
    searchingUser: false,
    isVisible: true
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules(): Rules<CreateMessage> {
      return {
        to: [required("Please add recipient")],
        subject: [required("Please input the mesage subject")],
        body: [required("Please input the message body")]
      };
    }
  },

  methods: {
    async findUser(query: string) {
      this.log("searchUser", { query });
      this.searchingUser = true;
      this.foundUsers = await searchUser({ name: query });
      this.searchingUser = false;
    },

    isValid(callback: Function) {},

    send() {
      if (this.loading) return;
      this.loading = true;

      this.errors = {};
      this.formRef.validate(async valid => {
        if (valid) await this.sendMessage();
        this.loading = false;
      });
    },

    async sendMessage() {
      try {
        const msg = await sendMessage({
          to: this.form.to || 0,
          subject: this.form.subject || "",
          body: this.form.body || "",
          importance_level: this.form.importance_level
        });

        Notification.success("Message sent.");

        emitEvent("message:sent", msg);
        this.goToParentView();
      } catch (errors) {
        this.errors = errors;
      }
    },

    goToParentView() {
      const direction = this.direction as SortDirection;
      const page = this.page;
      const pageSize = this.pageSize;
      const sort = this.sort;
      const type = this.type as MessagesType;

      const route = messagesRoute({ direction, page, pageSize, sort, type });

      this.$router.push(route);
    },

    setRecipient(recipient: any) {
      if (recipient) this.form.to = recipient.id;
      else this.form.to = "";
    }
  },

  created() {
    this.log = this.$logger.component(this);
  },

  watch: {
    selectedUser: "setRecipient"
  }
});
</script>

<template>
  <el-form v-loading="loading"
           :model="form"
           :rules="rules"
           ref="form"
           @submit.native.prevent="send"
           id="create-message">
    <el-dialog :visible.sync="isVisible"
               :close-on-click-modal="false"
               title="New message"
               width="90%"
               custom-class="message-modal">
      <el-form-item :error="errors.to"
                    prop="to">
        <el-select v-model="selectedUser"
                   value-key="id"
                   placeholder="User"
                   :remote-method="findUser"
                   :loading="searchingUser"
                   default-first-option
                   filterable
                   clearable
                   remote>
          <el-option v-for="user in foundUsers"
                     :key="user.id"
                     :label="user.name"
                     :value="user" />
        </el-select>
      </el-form-item>

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

      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   native-type="submit">
          Send
        </el-button>
      </span>
    </el-dialog>
  </el-form>
</template>

<style lang="scss">
#create-message .el-select {
  display: block;
}
</style>
