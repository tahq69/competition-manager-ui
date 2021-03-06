<script lang="ts">
import Vue from "vue";

import * as routes from "@/router/routes";
import { Paging, onEvent, offEvent } from "@/helpers";
import { store, getters } from "@/store";
import { table } from "@/components/mixins";

import { FetchUnreadMessageCount } from "@/modules/user/store/typings";
import { Message } from "@/modules/user/models";
import { fetchMessages } from "@/modules/user/service";
import {
  messagesRoute,
  createMessageRoute,
  messageRoute
} from "@/modules/user/routes";

export default Vue.extend({
  name: "Messages",

  mixins: [table],

  beforeRouteEnter(to, from, next) {
    // force store to update unread message count when entering this view.
    store.dispatch<FetchUnreadMessageCount>({
      type: "fetchUnreadMessageCount"
    });

    next();
  },

  beforeRouteUpdate(to, from, next) {
    // force store to update unread message count when reentering this view.
    store.dispatch<FetchUnreadMessageCount>({
      type: "fetchUnreadMessageCount"
    });

    next();
  },

  props: {
    type: { type: String, required: true }
  },

  data: () => ({
    routes,
    messages: [] as Message[]
  }),

  computed: {
    activeIndex(): string {
      if (this.$route.name == routes.messages.name) {
        return this.isInbox ? "1" : "2";
      }

      return "3";
    },

    unreadMessageCount(): number {
      return getters.getUnreadMessageCount;
    },

    isMessageCountVisible(): boolean {
      return !getters.isMessageCountLoading && this.unreadMessageCount > 0;
    },

    isInbox(): boolean {
      return this.type == "inbox";
    }
  },

  methods: {
    handleSelect(key: string, keyPath: string[]) {
      this.$router.push(this.resolveRoute(key));
    },

    resolveRoute(name: string) {
      switch (name) {
        case "1":
          return messagesRoute({ type: "inbox" });
        case "2":
          return messagesRoute({ type: "outbox" });
        case "3":
          return createMessageRoute();
      }

      throw new Error("Unexpected route name provided");
    },

    async fetchPage(paging: Paging) {
      const outbox = this.type === "outbox";
      const payload = { paging, outbox };
      const paginated = await fetchMessages(payload);

      this.messages = paginated.items;

      return paginated.total;
    },

    onRowClick(row: Message) {
      // opens message modal...
      const route = messageRoute({ message: row.id });
      this.$router.push(route);

      if (this.isInbox) {
        // mark message read status on UI to avoid requests of full page to
        // server side.
        row.is_read = true;
      }
    },

    addSentMessage(msg: Message) {
      if (this.type !== "outbox") return;

      // when message is sent, add it to the top of the list.
      this.messages.splice(0, 0, msg);
    },

    getRowClassName({ row, rowIndex }: { row: Message; rowIndex: number }) {
      if (!row.is_read) return "unread-message";
      return "";
    }
  },

  created() {
    this.log = this.$logger.component(this);
    onEvent("message:sent", this.addSentMessage);
  },

  watch: {
    type(type: string) {
      // If we move between inbox/outbox routes, fetch data from server.
      (this as any).fetchPageWrapper();
    }
  },

  beforeDestroy() {
    offEvent("message:sent", this.addSentMessage);
  }
});
</script>

<template>
  <div id="user-messages">
    <el-row>
      <el-col v-bind="{md: 4, sm: 6}">
        <el-menu :default-active="activeIndex"
                 @select="handleSelect">
          <el-menu-item index="3">New message</el-menu-item>
          <el-menu-item index="1">
            Inbox
            <el-badge v-if="isMessageCountVisible"
                      :value="unreadMessageCount" />
          </el-menu-item>
          <el-menu-item index="2">Outbox</el-menu-item>
        </el-menu>
      </el-col>
      <el-col v-bind="{md: 20, sm: 18}">
        <div v-loading="loading">
          <el-table class="row-as-link"
                    :data="messages"
                    :default-sort="defaultSort"
                    :row-class-name="getRowClassName"
                    @sort-change="onSortChange"
                    @row-click="onRowClick">
            <el-table-column prop="id"
                             sortable="custom"
                             width="80"
                             label="#">
            </el-table-column>
            <el-table-column v-if="type === 'inbox'"
                             prop="from_name"
                             sortable="custom"
                             label="From">
              <template slot-scope="msg">
                <div class="nowrap">
                  {{ msg.row.from_name }}&nbsp;
                  <span v-if="msg.row.reply_count">( {{ msg.row.reply_count }} )</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="type === 'outbox'"
                             prop="to_name"
                             sortable="custom"
                             label="To">
              <template slot-scope="msg">
                <div class="nowrap">
                  {{ msg.row.to_name }}&nbsp;
                  <span v-if="msg.row.reply_count">( {{ msg.row.reply_count }} )</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column sortable="custom"
                             label="Subject"
                             style="white-space: nowrap">
              <template slot-scope="msg">
                <span class="nowrap">{{ msg.row.subject }}</span>
              </template>
            </el-table-column>
            <el-table-column sortable="custom"
                             label="Date">
              <template slot-scope="msg">
                <el-tooltip :content="msg.row.audit.created.at">
                  <span class="nowrap">{{ msg.row.date_from_now }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

          <el-row class="pagination-row">
            <el-pagination @current-change="onPageChange"
                           @size-change="onPageSizeChange"
                           layout="total, prev, pager, next, sizes"
                           :current-page="currentPage"
                           :page-sizes="pageSizes"
                           :page-size="currentPageSize"
                           :total="totalItems">
            </el-pagination>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#user-messages {
  .unread-message {
    background-color: #ebeef5;
  }
}
</style>
