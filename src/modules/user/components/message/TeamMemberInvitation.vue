<script lang="ts">
import Vue from "vue";

import { getters } from "@/store";

import { Message } from "@/modules/user/models";
import {
  refuseTeamMemberInvitation,
  confirmTeamMemberInvitation
} from "@/modules/user/service";
import { TeamMemberInvitationPayload } from "@/modules/user/typings";

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
    loading: false,
    completed: false
  }),

  computed: {
    team(): string {
      return this.message.payload.from_team_name;
    },

    isCurrentUserInvitation(): boolean {
      return this.message.to_id === getters.user.id;
    },

    notCurrentUserMessage(): string {
      return `This invitation is sent to ${this.message.to_name}`;
    },

    disabled(): boolean {
      return (
        !this.isCurrentUserInvitation ||
        this.message.payload.completed ||
        this.completed
      );
    },

    invitationPayload(): TeamMemberInvitationPayload {
      return {
        message: this.message.id,
        member: this.message.payload.member_id
      };
    }
  },

  methods: {
    close() {
      this.$emit("close");
    },

    async confirm() {
      await this.changeInvitation(confirmTeamMemberInvitation);
    },

    async decline() {
      await this.changeInvitation(refuseTeamMemberInvitation);
    },

    async changeInvitation(
      callback: (payload: TeamMemberInvitationPayload) => Promise<void>
    ) {
      if (this.disabled) return;
      this.loading = true;

      const payload = this.invitationPayload;
      await callback(payload);

      this.loading = false;
      this.completed = true;
    }
  }
});
</script>

<template>
  <div v-loading="loading">
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
              :title="notCurrentUserMessage"
              :closable="false"
              type="warning"
              show-icon />
  </div>
</template>
