<script lang="ts">
import Vue from "vue";

import { SortDirection } from "@/typings";

import { MessagesType } from "@/modules/user/typings";
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
    }
  },

  data: () => ({
    isVisible: true,
    loading: true
  }),

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
      this.loading = false;
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
  <el-dialog :visible.sync="isVisible">
    <div v-loading="loading"
         id="message">
      Message
    </div>
  </el-dialog>
</template>
