import Vue from "vue";

import CreateTeamLink from "@/modules/teams/components/links/CreateTeamLink.vue";
import CreateTeamMemberLink from "@/modules/teams/components/links/CreateTeamMemberLink.vue";
import ManageTeamLink from "@/modules/teams/components/links/ManageTeamLink.vue";
import ManageTeamMemberLink from "@/modules/teams/components/links/ManageTeamMemberLink.vue";
import ManageTeamMembersLink from "@/modules/teams/components/links/ManageTeamMembersLink.vue";
import ManageTeamsLink from "@/modules/teams/components/links/ManageTeamsLink.vue";
import TeamCompetitionsLink from "@/modules/teams/components/links/TeamCompetitionsLink.vue";
import TeamLink from "@/modules/teams/components/links/TeamLink.vue";

Vue.component("CreateTeamLink", CreateTeamLink);
Vue.component("CreateTeamMemberLink", CreateTeamMemberLink);
Vue.component("ManageTeamLink", ManageTeamLink);
Vue.component("ManageTeamMemberLink", ManageTeamMemberLink);
Vue.component("ManageTeamMembersLink", ManageTeamMembersLink);
Vue.component("ManageTeamsLink", ManageTeamsLink);
Vue.component("TeamCompetitionsLink", TeamCompetitionsLink);
Vue.component("TeamLink", TeamLink);
