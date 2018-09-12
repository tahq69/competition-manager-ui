<script lang="ts">
import Vue from "vue";

import { getters } from "@/store";

import { Message } from "@/modules/user/models";

export default Vue.extend({
  name: "TeamMemberInvitation",

  props: {
    message: {
      type: Message,
      required: true,
      // warn if message payload is not provided.
      validator: (msg: Message) => !!msg.payload
    }
  },

  data: () => ({
    error: "",
    checkFailed: false
  }),

  computed: {
    team(): string {
      return this.message.payload.from_team_name;
    },

    user(): string {
      return this.message.payload.from_user_name;
    },

    id(): number {
      return this.message.payload.member_id;
    },

    isCurrentUserInvitation(): boolean {
      return this.message.to_id === getters.user.id;
    },

    disabled(): boolean {
      return !this.isCurrentUserInvitation || this.checkFailed;
    }
  },

  methods: {
    close() {
      this.$emit("close");
    },

    confirm() {
      if (this.disabled) return;
      // TODO
    },

    decline() {
      if (this.disabled) return;
      // TODO
    },

    checkInvitationStatus() {
      // TODO
    }
  },

  created() {
    this.checkInvitationStatus();
  }
});
</script>

<template>
  <div>
    <h3>Hello.</h3>
    <p>
      <span>You have been invited in to </span>
      <strong>{{ team }}</strong>
      <span> team</span>
    </p>
    <p>
      <span>If you agree to join this team:</span>
      &nbsp;
      <el-button @click="confirm"
                 type="success"
                 :disabled="disabled"
                 size="small"
                 plain>
        Confirm invitation
      </el-button>
    </p>
    <p>
      <span>To decline invitation and send reject message:</span>
      &nbsp;
      <el-button @click="decline"
                 type="danger"
                 :disabled="disabled"
                 size="small"
                 plain>
        Decline
      </el-button>
    </p>

    <el-alert v-if="error"
              type="error">
      {{ error }}
    </el-alert>
    <el-alert v-if="!isCurrentUserInvitation"
              type="warning">
      This invitation is sent to {{ message.to_name }}
    </el-alert>
  </div>
</template>
