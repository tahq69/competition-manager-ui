<script lang="ts">
import Vue from "vue";

import * as routes from "@/router/routes";
import { Paging } from "@/helpers";
import { table } from "@/components/mixins";

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
        return this.type == "inbox" ? "1" : "2";
      }

      return "3";
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
    }
  },

  created() {
    this.log = this.$logger.component(this);
  },

  watch: {
    type(type: string) {
      // If we move between inbox/outbox routes, fetch data from server.
      (this as any).fetchPageWrapper();
    }
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
            <el-badge :value="12"></el-badge>
          </el-menu-item>
          <el-menu-item index="2">Outbox</el-menu-item>
        </el-menu>
      </el-col>
      <el-col v-bind="{md: 20, sm: 18}">
        <div v-loading="loading">
          <el-table class="row-as-link"
                    :data="messages"
                    :default-sort="defaultSort"
                    @sort-change="onSortChange"
                    @row-click="onRowClick">
            <el-table-column v-if="type === 'inbox'"
                             prop="from_name"
                             sortable="custom"
                             label="From">
              <template slot-scope="msg">
                {{ msg.row.from_name }}
                <span v-if="msg.row.reply_count">
                  &nbsp;( {{ msg.row.reply_count }} )
                </span>
              </template>
            </el-table-column>
            <el-table-column v-if="type === 'outbox'"
                             prop="to_name"
                             sortable="custom"
                             label="To">
              <template slot-scope="msg">
                {{ msg.row.to_name }}
                <span v-if="msg.row.reply_count">
                  &nbsp;( {{ msg.row.reply_count }} )
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="subject"
                             sortable="custom"
                             label="Subject">
            </el-table-column>
            <el-table-column prop="date_from_now"
                             sortable="custom"
                             label="Subject">
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
