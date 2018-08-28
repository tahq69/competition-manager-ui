import Vue from "vue";

import CreateTeamLink from "@/modules/teams/components/links/CreateTeamLink";
import CreateTeamMemberLink from "@/modules/teams/components/links/CreateTeamMemberLink";
import ManageTeamLink from "@/modules/teams/components/links/ManageTeamLink";
import ManageTeamMemberLink from "@/modules/teams/components/links/ManageTeamMemberLink";
import ManageTeamMembersLink from "@/modules/teams/components/links/ManageTeamMembersLink";
import ManageTeamsLink from "@/modules/teams/components/links/ManageTeamsLink";
import TeamCompetitionsLink from "@/modules/teams/components/links/TeamCompetitionsLink";
import TeamLink from "@/modules/teams/components/links/TeamLink";

Vue.component("CreateTeamLink", CreateTeamLink);
Vue.component("CreateTeamMemberLink", CreateTeamMemberLink);
Vue.component("ManageTeamLink", ManageTeamLink);
Vue.component("ManageTeamMemberLink", ManageTeamMemberLink);
Vue.component("ManageTeamMembersLink", ManageTeamMembersLink);
Vue.component("ManageTeamsLink", ManageTeamsLink);
Vue.component("TeamCompetitionsLink", TeamCompetitionsLink);
Vue.component("TeamLink", TeamLink);
