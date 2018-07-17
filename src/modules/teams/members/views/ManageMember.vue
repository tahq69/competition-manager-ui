<script lang="ts">
import Vue from "vue";

import { ElForm, Rules, Rule } from "@/typings";
import { manageTeamMember } from "@/router/routes";
import { searchUser } from "@/helpers/service";
import { required } from "@/helpers/validators";
import { UserBase } from "@/components/auth/models/user-base";

import { ManageTeamMember, TeamMember, Team } from "#/teams/models";
import { fetchTeam } from "#/teams/service";

import ManageTeamLink from "#/teams/components/ManageTeamLink.vue";
import ManageTeamMembersLink from "#/teams/components/ManageTeamMembersLink.vue";
import MemberRoleInput from "#/teams/components/MemberRoleInput.vue";
import TeamLink from "#/teams/components/TeamLink.vue";

import {
  fetchTeamMember,
  saveTeamMember,
  saveMemberRoles
} from "#/teams/members/service";
import { TeamMemberAuth } from "#/teams/members/auth";
import { manageTeamMembersRoute } from "#/teams/members/routes";

export default Vue.extend({
  name: "ManageMember",

  components: {
    ManageTeamLink,
    ManageTeamMembersLink,
    MemberRoleInput,
    TeamLink
  },

  props: {
    team: { type: [String, Number], required: true },
    member: { type: [String, Number], required: false }
  },

  beforeRouteUpdate(to, from, next) {
    this.formRef.clearValidate();
    next();
  },

  data: () => ({
    loading: false,
    canEditRoles: false,
    form: new ManageTeamMember(),
    errors: {},
    initialUserId: 0,
    memberTeam: new Team({}),
    searchingUser: false,
    searchedUsers: [] as any[],
    selectedUser: {} as any
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules(): Rules<ManageTeamMember> {
      return {
        id: [],
        user_id: [],
        team_id: [],
        name: [required("Please input the name")],
        roles: []
      };
    },

    title(): string {
      if (this.member)
        return this.$t("teams.manage_member_edit_title") as string;

      return this.$t("teams.manage_member_create_title") as string;
    },

    isInvitationVisible(): boolean {
      this.log(this.form.user_id, this.initialUserId);
      return !!this.form.user_id && this.form.user_id !== this.initialUserId;
    },

    invitation(): any {
      return { name: this.form.name, team: this.memberTeam.short };
    }
  },

  methods: {
    async fetchData() {
      this.loading = true;
      const payload = { id: this.team };
      this.memberTeam = await fetchTeam(payload);
      this.form.team_id = this.team;

      if (this.member) {
        // member exists only if we open edit form.
        const payload = { id: this.member, team_id: this.team };
        const member = await fetchTeamMember(payload);

        this.setMember(member);
      }

      this.loading = false;
    },

    async searchUser(query: string) {
      this.log("searchUser", { query });
      this.searchingUser = true;
      this.searchedUsers = await searchUser({ name: query });
      this.searchingUser = false;
    },

    setMember(member: TeamMember) {
      this.log("setMember(member)", { member });
      const { user_id, name } = member;

      this.initialUserId = user_id || 0;
      this.selectedUser = { id: this.initialUserId, name };
      this.searchedUsers.push(this.selectedUser);

      // fill up form with member information from API.
      this.form.user_id = this.initialUserId;
      this.form.name = name;
      this.form.id = member.id;
    },

    associateMember(user: UserBase | string) {
      this.log("associateMember", { user });

      if (typeof user === "string") {
        this.form.user_id = 0;
        this.form.name = name;
        return;
      }

      this.form.user_id = user.id;
      this.form.name = user.name;
    },

    async save() {
      this.log("save", this.form);
      if (this.loading) return;

      this.loading = true;
      this.errors = {};

      this.formRef.validate(async valid => {
        if (!valid) {
          this.loading = false;
          return false;
        }

        try {
          await saveTeamMember(this.form);

          if (this.member && this.canEditRoles) {
            await saveMemberRoles({
              team: this.team,
              member: this.form.id,
              roles: this.form.roles
            });
          }

          this.$notify.success(this.notificationDetails());
          this.$router.push(manageTeamMembersRoute({ team: this.team }));
        } catch (errors) {
          this.errors = this.concatErrors(errors);
        }

        this.loading = false;
      });
    },

    concatErrors(errors: any) {
      if (errors.user_id) {
        errors.name = errors.name
          ? [...errors.name, ...errors.user_id]
          : errors.user_id;
      }

      return errors;
    },

    dismissInvitation() {
      this.form.user_id = 0;
    },

    notificationDetails(): { title: string; message: string } {
      if (this.isInvitationVisible) {
        return {
          message: this.$t(
            "teams.manage_member_invitation_sent_body",
            this.invitation
          ).toString(),
          title: this.$t("teams.manage_member_invitation_sent_title").toString()
        };
      }

      return {
        message: this.$t(
          "teams.manage_member_saved_body",
          this.invitation
        ).toString(),
        title: this.$t("teams.manage_member_saved_title").toString()
      };
    }
  },

  watch: {
    selectedUser: "associateMember"
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchData();

    TeamMemberAuth.canEditRoles({ team: this.team }).then(
      canEdit => (this.canEditRoles = canEdit)
    );
  }
});
</script>

<template>
  <el-card id="manage-team-member">
    <div slot="header"
         class="clearfix">
      <span>{{ title }}</span>
      <ManageTeamLink :team="team"
                      title="Edit team details"
                      icon="edit"
                      button
                      mini>
        Teams
      </ManageTeamLink>
      <TeamLink :team="team"
                title="Team details"
                icon="view"
                button
                mini>
        Team
      </TeamLink>
      <ManageTeamMembersLink :team="team"
                             title="Manage team members"
                             icon="tickets"
                             button
                             mini>
        Members
      </ManageTeamMembersLink>
    </div>
    <el-form v-loading="loading"
             :model="form"
             :rules="rules"
             ref="form"
             :label-position="_config.label_position"
             :label-width="_config.label_width"
             @submit.native.prevent="save">
      <el-form-item v-if="member && canEditRoles"
                    label="Member roles"
                    :error="errors.roles"
                    prop="roles">
        <MemberRoleInput v-model="form.roles"
                         :member="member"
                         :team="team" />
      </el-form-item>
      <el-form-item :label="$t('teams.manage_member_name_label')"
                    :error="errors.name"
                    prop="name">
        <el-select v-model="selectedUser"
                   value-key="name"
                   placeholder="Name"
                   :remote-method="searchUser"
                   :loading="searchingUser"
                   default-first-option
                   allow-create
                   filterable
                   clearable
                   remote>
          <el-option v-for="user in searchedUsers"
                     :key="user.id"
                     :label="user.name"
                     :value="user" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="isInvitationVisible">
        <span>
          {{ $t('teams.manage_member_invitation_text', invitation) }}
        </span>
        <el-button :title="$t('teams.manage_member_invitation_dismiss')"
                   @click="dismissInvitation"
                   type="danger"
                   icon="el-icon-close"
                   size="mini"
                   circle />
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   native-type="submit">
          Save
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
.el-select {
  display: block;
}
</style>
