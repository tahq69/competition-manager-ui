<script lang="ts">
import Vue from "vue";

import { SortDirection } from "@/typings";
import { emitEvent } from "@/helpers";

import { Message, MessageType } from "@/modules/user/models";
import { MessagesType } from "@/modules/user/typings";
import { fetchMessage } from "@/modules/user/service";
import { messagesRoute } from "@/modules/user/routes";

import ReplyMessage from "@/modules/user/components/ReplyMessage.vue";

const validator = (page: string | number) => parseInt(page.toString()) > 0;
const directions = ["ascending", "descending"];

export default Vue.extend({
  name: "Message",

  components: { ReplyMessage },

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
    messageType: MessageType,
    isReplyVisible: false
  }),

  computed: {
    tableRef(): any {
      return this.$refs["table"];
    },

    replySubject(): string {
      return this.msg.subject.indexOf("Re: ") === 0
        ? this.msg.subject
        : `Re: ${this.msg.subject}`;
    },

    canReply(): boolean {
      // reply is available only if message is opened from inbox.
      return this.type === "inbox";
    }
  },

  methods: {
    goToInbox() {
      const direction = this.direction as SortDirection;
      const page = this.page;
      const pageSize = this.pageSize;
      const sort = this.sort;
      const type = this.type as MessagesType;

      const route = messagesRoute({ direction, page, pageSize, sort, type });

      this.$router.push(route);
    },

    async fetchData() {
      this.loading = true;

      this.msg = await fetchMessage({ id: this.message });
      this.flattenMessages(this.msg);

      this.$nextTick(() => {
        // open lates message body when all messages in table are rendered.
        this.tableRef.toggleRowExpansion(this.messages[0], true);
      });

      this.loading = false;
    },

    flattenMessages(message: Message) {
      this.messages.push(message);

      if (message.reply_on) {
        this.flattenMessages(message.reply_on);
      }
    },

    reply() {
      emitEvent("message:reply");
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchData();
  },

  watch: {
    isVisible(newValue) {
      if (!newValue) {
        // If user manually closes modal, redirect user back to the inbox.
        this.goToInbox();
      }
    }
  }
});
</script>

<template>
  <el-dialog :visible.sync="isVisible"
             :close-on-click-modal="false"
             title="Message"
             width="90%"
             custom-class="message-modal">
    <div v-loading="loading"
         id="message">
      <el-table ref="table"
                :data="messages"
                :show-header="false">
        <el-table-column type="expand">
          <template slot-scope="m">
            <div v-if="m.row.type == messageType.UserMessage"
                 v-html="m.row.body"></div>
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
        <el-table-column>
          <template slot-scope="msg">
            <div class="nowrap">{{ msg.row.subject }}</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="msg">
            <el-tooltip :content="msg.row.audit.created.at">
              <span class="nowrap">{{ msg.row.date_from_now }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <ReplyMessage v-if="isReplyVisible"
                  :subject="replySubject"
                  :id="msg.id"
                  @sent="goToInbox"
                  class="reply-message" />

    <span slot="footer"
          class="dialog-footer">
      <el-button v-if="!isReplyVisible && canReply"
                 @click="isReplyVisible = true">
        Reply
      </el-button>

      <el-button type="primary"
                 v-if="isReplyVisible && canReply"
                 @click="reply">
        Send reply
      </el-button>
    </span>
  </el-dialog>
</template>

<style lang="scss">
.message-modal {
  .el-dialog__body {
    padding: 15px 20px;
  }

  .reply-message {
    padding-top: 20px;
  }
}
</style>
