<script lang="ts">
import Vue from "vue";

import { SortDirection } from "@/typings";

import { Message, MessageType } from "@/modules/user/models";
import { MessagesType } from "@/modules/user/typings";
import { fetchMessage } from "@/modules/user/service";
import { messagesRoute } from "@/modules/user/routes";

const validator = (page: string | number) => parseInt(page.toString()) > 0;
const directions = ["ascending", "descending"];

export default Vue.extend({
  name: "Message",

  props: {
    type: { type: String, required: true },
    page: { type: [String, Number], required: true, validator },
    pageSize: { type: [String, Number], default: 10, validator },
    sort: { type: String, default: "id" },
    direction: {
      type: String,
      default: "descending",
      validator: (val: string) => directions.indexOf(val) > -1
    },
    message: { type: [String, Number], required: true }
  },

  data: () => ({
    isVisible: true,
    loading: true,
    msg: {} as Message,
    messages: [] as Message[],
    messageType: MessageType
  }),

  computed: {
    tableRef(): any {
      return this.$refs["table"];
    }
  },

  methods: {
    goToInbox() {
      this.$router.push(
        messagesRoute({
          type: this.type as MessagesType,
          direction: this.direction as SortDirection,
          pageSize: this.pageSize,
          page: this.page,
          sort: this.sort
        })
      );
    },

    async fetchData() {
      this.loading = true;

      this.msg = await fetchMessage({ id: this.message });
      this.flattenMessages(this.msg);

      this.$nextTick(() => {
        // open message body when messages in table is rendered.
        this.tableRef.toggleRowExpansion(this.messages[0], true);
      });

      this.loading = false;
    },

    flattenMessages(message: Message, isInitial = true) {
      const msg = new Message(message);
      const subjectMaxLength = 40;
      const subjectLength = msg.subject.length;
      const tLen = Math.min(subjectLength - 4, 40);
      msg.audit = message.audit;
      msg.subject =
        subjectLength >= 40
          ? msg.subject.substring(0, tLen) + "..."
          : msg.subject;
      this.messages.push(msg);

      if (message.reply_on) {
        this.flattenMessages(message.reply_on, false);
      }
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchData();
  },

  watch: {
    isVisible(newValue) {
      if (!newValue) {
        // If user manually closes model, redirect user back to the inbox.
        this.goToInbox();
      }
    }
  }
});
</script>

<template>
  <el-dialog :visible.sync="isVisible"
             width="90%">
    <div v-loading="loading"
         id="message">
      <el-table ref="table"
                :data="messages"
                :show-header="false">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-if="message.type == messageType.UserMessage"
                 v-html="message.body"></div>
            <div v-else>TODO</div>
            <!-- todo: implement invitation type component
            <team-member-invitation
                v-else-if="message.isTeamMemberInvitation"
                :message="message" :on-close="close"></team-member-invitation
            >-->
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="msg">
            <strong>{{ msg.row.from_name }}</strong>
          </template>
        </el-table-column>
        <el-table-column prop="subject">
        </el-table-column>
        <el-table-column>
          <template slot-scope="msg">
            <span class="float-right">
              {{ msg.row.date_from_now }} ({{ msg.row.audit.created.at }})
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
