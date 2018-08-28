import { Location } from "vue-router";
import { IRouteParams } from "@/typings";

export function convertParams(params: IRouteParams) {
  const result: { [key: string]: string } = {};
  Object.keys(params).forEach(key => (result[key] = params[key].toString()));
  return result;
}

export function createRoute(
  route: Location,
  params?: any,
  defaults: any = { page: 1, pageSize: 10, sort: "id", direction: "descending" }
) {
  return {
    ...route,
    params: convertParams(Object.assign(defaults, params))
  };
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
export const competitionGroups = { name: "competitionGroups" };
export const manageGroups = { name: "manageGroups" };
export const createGroup = { name: "createGroup" };
export const manageGroup = { name: "manageGroup" };
export const createCategory = { name: "createCategory" };
export const manageCategory = { name: "manageCategory" };
export const competitionAreas = { name: "competitionAreas" };
export const competitionArea = { name: "competitionArea" };

export const manageCompetitions = { name: "manageCompetitions" };
export const createCompetition = { name: "createCompetition" };
export const manageCompetitionDetails = { name: "manageCompetitionDetails" };
export const createDiscipline = { name: "createDiscipline" };
export const manageDiscipline = { name: "manageDiscipline" };
export const createCompetitionArea = { name: "createCompetitionArea" };
export const manageCompetitionArea = { name: "manageCompetitionArea" };
