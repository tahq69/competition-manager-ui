import { Location } from "vue-router";

import { IRouteParams } from "@/types";

export function convertParams(params: IRouteParams) {
  const result = {} as { [key: string]: string };
  Object.keys(params).forEach(key => (result[key] = params[key].toString()));
  return result;
}

export const home = { name: "home" };

export const login = { name: "login" };
export const signUp = { name: "signUp" };
export const profile = { name: "profile" };
export const authProfile = { name: "authProfile" };
export const forgotPassword = { name: "forgotPassword" };
export const resetPassword = { name: "resetPassword" };

export const messages = { name: "messages" };
export const message = { name: "message" };
export const createMessage = { name: "createMessage" };

export const managePosts = { name: "managePosts" };
export const createPost = { name: "createPost" };
export const managePost = { name: "managePost" };
export const readPost = { name: "readPost" };

export const manageTeams = { name: "manageTeams" };
export const createTeam = { name: "createTeam" };
export const manageTeam = { name: "manageTeam" };

export const manageTeamMembers = { name: "manageTeamMembers" };
export const createTeamMember = { name: "createTeamMember" };
export const manageTeamMember = { name: "manageTeamMember" };

export const teams = { name: "teams" };
export const teamMembers = { name: "teamMembers" };
export const teamCompetitions = { name: "teamCompetitions" };

export const competitions = { name: "competitions" };
export const competitionDetails = { name: "competitionDetails" };
export const competitionDisciplines = { name: "competitionDisciplines" };
export const competitionDiscipline = { name: "competitionDiscipline" };
export const competitionDisciplineGroups = {
  name: "competitionDisciplineGroups"
};
export const manageCompetitionDisciplineGroups = {
  name: "manageCompetitionDisciplineGroups"
};
export const createCompetitionDisciplineGroup = {
  name: "createCompetitionDisciplineGroup"
};
export const manageCompetitionDisciplineGroup = {
  name: "manageCompetitionDisciplineGroup"
};
export const createCompetitionDisciplineCategory = {
  name: "createCompetitionDisciplineCategory"
};
export const manageCompetitionDisciplineCategory = {
  name: "manageCompetitionDisciplineCategory"
};
export const competitionAreas = { name: "competitionAreas" };
export const competitionArea = { name: "competitionArea" };

export const manageCompetitions = { name: "manageCompetitions" };
export const createCompetition = { name: "createCompetition" };
export const manageCompetitionDetails = { name: "manageCompetitionDetails" };
export const createCompetitionDiscipline = {
  name: "createCompetitionDiscipline"
};
export const manageCompetitionDiscipline = {
  name: "manageCompetitionDiscipline"
};
export const createCompetitionArea = { name: "createCompetitionArea" };
export const manageCompetitionArea = { name: "manageCompetitionArea" };
