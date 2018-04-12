<script lang="ts">
import { Form } from "crip-vue-bootstrap";
import CripSelect from "crip-vue-select";
import Vue from "vue";
import { Location } from "vue-router";

import { UserBase } from "@/components/auth/models/user-base";
import { manageTeamMember } from "@/router/routes";
import { Next } from "@/typings";

import ManageTeamMembersBtn from "#/teams/components/ManageTeamMembersBtn.vue";
import TeamBtn from "#/teams/components/TeamBtn.vue";

import { Team } from "../../models/team";
import { TeamMember } from "../../models/team-member";

import teamService from "../../service";
import { TeamMemberAuth } from "../auth";
import memberService from "../service";

import { manageTeamMemberRoute, manageTeamMembersRoute } from "../routes";

import MemberRoleControl from "./MemberRoleControl.vue";

function toUserOption(user: UserBase) {
  return {
    key: user.id,
    text: user.name,
    value: user
  };
}

export default Vue.extend({
  name: "ManageMember",

  components: { MemberRoleControl, ManageTeamMembersBtn, TeamBtn },

  props: {
    team: { type: [String, Number], required: true },
    member: { type: [String, Number], required: false }
  },

  async beforeRouteEnter(to, from, next: Next<any>) {
    const team = await teamService.fetchTeam({ id: to.params.team });
    if (to.params.member) {
      // If it is edit route, we need fetch member details from api and
      // initialize them on select.
      const payload = { id: to.params.member, team_id: to.params.team };
      const member = await memberService.fetchTeamMember(payload);

      return next(vm => {
        vm.setTeam(team);
        vm.setMember(member);
      });
    }

    // This is create route and we can simply show a empty form.
    next(vm => vm.setTeam(team));
  },

  data() {
    return {
      canEditRoles: false,
      form: new Form<TeamMember>(new TeamMember({})),
      initialUserId: 0,
      memberTeam: new Team({}),
      userSelect: new CripSelect<UserBase>({
        onCriteriaChange: (criteria, setOptions, id) => {
          teamService.searchUser({ name: criteria }).then(users => {
            const options = users.map(user => toUserOption(user));
            setOptions(options, id);
          });
        }
      })
    };
  },

  computed: {
    isEdit(): boolean {
      return this.$route.name === manageTeamMember.name;
    },

    title(): string {
      if (this.isEdit)
        return this.$t("teams.manage_member_edit_title") as string;

      return this.$t("teams.manage_member_create_title") as string;
    },

    isInvitationVisible(): boolean {
      this.log(this.form.data.user_id, this.initialUserId);
      return (
        !!this.form.data.user_id &&
        this.form.data.user_id !== this.initialUserId
      );
    },

    invitation(): any {
      return { name: this.form.data.name, team: this.memberTeam.short };
    }
  },

  methods: {
    setTeam(team: Team) {
      this.memberTeam = team;
    },

    setMember(member: TeamMember) {
      this.log("setMember(member)", { member });
      const userId = member.user_id || 0;
      this.initialUserId = userId;

      // Add member option to select option list and make it selected.
      const { name } = member;
      const option = {
        key: userId,
        text: name,
        value: new UserBase({ id: userId, name })
      };

      this.userSelect.addOption(option);
      this.userSelect.selectOption(option);

      // Fil up form with member information from API.
      this.form.data.user_id = userId;
      this.form.data.name = name;
      this.form.data.id = member.id;
    },

    async associatedMember(user: UserBase | string | null) {
      this.log("associatedMember", { user });

      if (typeof user === "string") {
        this.newMember(user);
        return;
      }

      if (user === null) {
        this.form.data.user_id = 0;
        this.form.data.name = "";

        return;
      }

      this.form.data.user_id = parseInt(user.id.toString(), 10);
      this.form.data.name = user.name;
    },

    newMember(name: string) {
      this.log("newMember", { name });
      this.form.data.user_id = 0;
      this.form.data.name = name;
    },

    async saveMember() {
      this.log("saveMember", { data: this.form.data });
      this.form.clearErrors();
      try {
        const member = await memberService.saveTeamMember({
          id: this.form.data.id,
          name: this.form.data.name,
          team_id: this.team.toString(),
          user_id: this.form.data.user_id
        });

        if (this.isEdit && this.canEditRoles) {
          await memberService.saveMemberRoles({
            team: this.team,
            member: this.form.data.id,
            roles: this.form.data.roles
          });
        }

        this.$notice.success(this.notificationDetails());

        this.initialUserId = member.user_id || 0;

        const params = { team: this.team, member: member.id };
        const manageRoute = manageTeamMemberRoute(params);
        this.$router.push(manageRoute);
      } catch (error) {
        const errors = this.concatErrors(error);
        this.form.addErrors(errors);
      }
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
      this.form.data.user_id = 0;
    },

    notificationDetails(): { title: string; description: string } {
      if (this.isInvitationVisible) {
        return {
          description: this.$t(
            "teams.manage_member_invitation_sent_body",
            this.invitation
          ).toString(),
          title: this.$t("teams.manage_member_invitation_sent_title").toString()
        };
      }

      return {
        description: this.$t(
          "teams.manage_member_saved_body",
          this.invitation
        ).toString(),
        title: this.$t("teams.manage_member_saved_title").toString()
      };
    },

    manageTeamMembersRoute() {
      return manageTeamMembersRoute({ team: this.memberTeam.id });
    }
  },

  created() {
    this.log = this.$logger.component(this);

    TeamMemberAuth.canEditRoles({ team: this.memberTeam.id }).then(
      canEdit => (this.canEditRoles = canEdit)
    );
  }
});
</script>

<template>
  <CFormCard id="manage-member"
             :form="form"
             :title="title"
             @submit="saveMember"
             class="col-xs-12">

    <span slot="actions">
      <ManageTeamMembersBtn :team="team"
                            btn="light">
        Manage members
      </ManageTeamMembersBtn>

      <TeamBtn :team="team"
               btn="light"
               with-icon>
        Team
      </TeamBtn>
    </span>

    <CFormGroup label="Member roles"
                for="member-roles"
                :sm="8">
      <MemberRoleControl v-if="isEdit && canEditRoles"
                         v-model="form.data.roles"
                         :member="form.data.id"
                         :team="memberTeam.id" />
    </CFormGroup>

    <!-- #name -->
    <CFormGroup for="name"
                :form="form"
                :label="$t('teams.manage_member_name_label')"
                :sm="8">
      <CripSelect :settings="userSelect"
                  :input-class="[{'is-invalid': form.errors.name}]"
                  @input="associatedMember"
                  id="member"
                  tags>
        <CFormErrors slot="feedback"
                     :errors="form.errors.name" />
      </CripSelect>
    </CFormGroup>

    <!-- #invitation -->
    <CFormGroup :sm="8"
                v-if="isInvitationVisible">
      <button type="button"
              @click="dismissInvitation"
              class="close text-danger"
              :title="$t('teams.manage_member_invitation_dismiss')">
        &times;
      </button>
      <span>
        {{ $t('teams.manage_member_invitation_text', invitation) }}
      </span>
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup for="submit"
                :sm="8">
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        {{ $t('teams.manage_member_submit_btn') }}
      </button>
    </CFormGroup>
  </CFormCard>
</template>

<style lang="scss" scoped>
button.close.text-danger {
  float: none;
  font-weight: bolder;
}
</style>
