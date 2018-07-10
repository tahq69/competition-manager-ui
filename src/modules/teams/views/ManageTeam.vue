<script lang="ts">
import Vue from "vue";
import { ElForm, Rules, Rule, Next } from "@/typings";

import { required } from "@/helpers/validators";

import FileInput from "@/components/form/FileInput.vue";
import Submit from "@/components/form/Submit.vue";
import { manageTeam } from "@/router/routes";

import { createTeamMemberRoute } from "#/teams/members/routes";
import { manageTeamRoute } from "#/teams/routes";
import { fetchTeam, saveTeam } from "#/teams/service";
import { ManageTeam } from "#/teams/models";

import TeamBtn from "#/teams/components/TeamBtn.vue";
import ManageTeamsBtn from "#/teams/components/ManageTeamsBtn.vue";
import CreateTeamMemberBtn from "#/teams/components/CreateTeamMemberBtn.vue";
import ManageTeamMembersBtn from "#/teams/components/ManageTeamMembersBtn.vue";

export default Vue.extend({
  name: "ManageTeam",

  components: {
    CreateTeamMemberBtn,
    FileInput,
    ManageTeamMembersBtn,
    ManageTeamsBtn,
    Submit,
    TeamBtn
  },

  props: {
    team: { type: [String, Number], required: false }
  },

  beforeRouteUpdate(to, from, next) {
    this.formRef.clearValidate();
    next();
  },

  data: () => ({
    loading: false,
    form: new ManageTeam(),
    errors: {},
    teamName: ""
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules(): Rules<ManageTeam> {
      return {
        name: [required("Please input the name")],
        short: [required("Please input the short name")],
        logo: []
      };
    },

    title(): string {
      if (this.team) return `Manage team: ${this.teamName}`;
      return "Create new team";
    },

    createTeamMemberRoute(): any {
      return createTeamMemberRoute({ team: this.team });
    }
  },

  methods: {
    fetchTeam() {
      this.loading = true;

      const payload = { id: this.team };
      fetchTeam(payload)
        .then(team => {
          this.form = team;
          this.teamName = team.name;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },

    async save() {
      if (this.loading) return;

      this.loading = true;
      this.errors = {};

      this.formRef.validate(async valid => {
        if (!valid) {
          this.loading = false;
          return false;
        }

        try {
          const team = await saveTeam(this.form);
          this.$notify.success("Team saved");
          this.loading = false;

          const manageTeam = manageTeamRoute({ team: team.id });
          this.$router.push(manageTeam);
        } catch (errors) {
          this.loading = false;
          this.errors = errors;
        }
      });
    }
  },

  created() {
    if (this.team) {
      // if we open edit route, we load data from API and show it in a form.
      this.fetchTeam();
    }
  }
});
</script>

<template>
  <el-card id="manage-team">
    <span slot="header">{{ title }}</span>
    <el-form v-loading="loading"
             :model="form"
             :rules="rules"
             ref="form"
             :label-position="_config.label_position"
             :label-width="_config.label_width"
             @submit.native.prevent="save">
      <el-form-item label="Name"
                    :error="errors.name"
                    prop="name">
        <el-input v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  autofocus
                  clearable />
      </el-form-item>

      <el-form-item label="Short title"
                    :error="errors.short"
                    prop="short">
        <el-input v-model="form.short"
                  type="text"
                  name="short"
                  placeholder="Short title"
                  clearable />
      </el-form-item>

      <el-form-item label="Team logo"
                    :error="errors.logo"
                    prop="logo">
        <FileInput id="logo"
                   size="sm"
                   name="logo"
                   type="image"
                   v-model="form.logo" />
      </el-form-item>

      <el-form-item v-if="form.logo">
        <img :src="form.logo">
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   native-type="submit">
          Save
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <!--
    <span slot="actions">
      <ManageTeamsBtn btn="light" icon>Teams</ManageTeamsBtn>
      <TeamBtn v-if="isEdit" :team="form.id" btn="light" title="View team public profile" icon>Preview</TeamBtn>
      <ManageTeamMembersBtn v-if="isEdit" :team="form.id" btn="light" icon>Members</ManageTeamMembersBtn>
      <CreateTeamMemberBtn v-if="isEdit" :team="form.id" btn="light" icon>Add member</CreateTeamMemberBtn>
    </span>
  -->
</template>
