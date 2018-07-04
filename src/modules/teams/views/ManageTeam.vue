<script lang="ts">
import Vue from "vue";

import FileInput from "@/components/form/FileInput.vue";
import Submit from "@/components/form/Submit.vue";
import { manageTeam } from "@/router/routes";
import { Next } from "@/typings";

import TeamBtn from "#/teams/components/TeamBtn.vue";
import ManageTeamsBtn from "#/teams/components/ManageTeamsBtn.vue";
import CreateTeamMemberBtn from "#/teams/components/CreateTeamMemberBtn.vue";
import ManageTeamMembersBtn from "#/teams/components/ManageTeamMembersBtn.vue";

import { createTeamMemberRoute } from "../members/routes";
import { Team } from "../models/team";
import { manageTeamRoute } from "../routes";
import teamService from "../service";

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

  beforeRouteEnter(to, from, next: Next<any>) {
    const open = (team: Team) => next(vm => vm.setTeam(team));

    // If we open create route, we have no data to load from API and we can
    // initialize from with emtry data record.
    if (to.name !== manageTeam.name) return open(new Team({}));

    // If we open edit route, we load data from API and show it in a form.
    const payload = { id: to.params.team };
    teamService.fetchTeam(payload).then(team => open(team));
  },

  data: () => ({
    form: new Team({}),
    teamName: ""
  }),

  computed: {
    isEdit(): boolean {
      return this.$route.name === manageTeam.name;
    },

    title(): string {
      if (this.isEdit) return `Manage team: ${this.teamName}`;
      return "Create new team";
    },

    createTeamMemberRoute(): any {
      return createTeamMemberRoute({ team: this.form.id });
    }
  },

  methods: {
    setTeam(team: Team) {
      this.form = team;
      this.teamName = team.name;
    },

    async save() {
      this.log("save()", this.form);

      /*this.form.clearErrors();
      try {
        const team = await teamService.saveTeam(this.form.data);
        this.$notify.success("Team saved");
        this.$router.push(manageTeamRoute({ team: team.id }));
      } catch (errors) {
        this.form.addErrors(errors);
      }*/
    }
  },

  mounted() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <CFormCard :title="title"
             :form="form"
             id="manage-team"
             @submit="save">

    <span slot="actions">
      <ManageTeamsBtn btn="light"
                      icon>
        Teams
      </ManageTeamsBtn>

      <TeamBtn v-if="isEdit"
               :team="form.data.id"
               btn="light"
               title="View team public profile"
               icon>
        Preview
      </TeamBtn>

      <ManageTeamMembersBtn v-if="isEdit"
                            :team="form.data.id"
                            btn="light"
                            icon>
        Members
      </ManageTeamMembersBtn>

      <CreateTeamMemberBtn v-if="isEdit"
                           :team="form.data.id"
                           btn="light"
                           icon>
        Add member
      </CreateTeamMemberBtn>
    </span>

    <!-- #name -->
    <CFormGroup for="name"
                :form="form"
                label="Name">
      <input type="text"
             id="name"
             v-model="form.data.name"
             name="name"
             :class="[{'is-invalid': form.errors.name}, 'form-control']">
    </CFormGroup>

    <!-- #short -->
    <CFormGroup for="short"
                :form="form"
                label="Short title">
      <input type="text"
             id="short"
             v-model="form.data.short"
             name="short"
             :class="[{'is-invalid': form.errors.short}, 'form-control']">
    </CFormGroup>

    <!-- #logo -->
    <CFormGroup for="logo"
                :form="form"
                label="Team logo">
      <FileInput id="logo"
                 name="logo"
                 size="sm"
                 type="image"
                 v-model="form.data.logo"
                 :form="form"
                 :input-class="[{'is-invalid': form.errors.logo}, 'form-control']" />
    </CFormGroup>

    <!-- #logo-preview -->
    <CFormGroup v-if="form.data.logo">
      <img :src="form.data.logo">
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup>
      <Submit>Save</Submit>
    </CFormGroup>
  </CFormCard>
</template>
