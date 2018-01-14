import { Location } from "vue-router"

export const home = { name: "home" }

export const login = { name: "login" }
export const signUp = { name: "signUp" }
export const profile = { name: "profile" }
export const forgotPassword = { name: "forgotPassword" }
export const resetPassword = { name: "resetPassword" }

export const messages = { name: "messages" }
export const message = { name: "message" }
export const createMessage = { name: "createMessage" }

export const managePosts = { name: "managePosts" }
export const createPost = { name: "createPost" }
export const managePost = { name: "managePost" }
export const readPost = { name: "readPost" }

export const manageTeams = { name: "manageTeams" }
export const createTeam = { name: "createTeam" }
export const manageTeam = { name: "manageTeam" }

export const manageTeamMembers = { name: "manageTeamMembers" }
export const createTeamMember = { name: "createTeamMember" }
export const manageTeamMember = { name: "manageTeamMember" }

export const teamDetails = {
  name: "teamDetails",
  params: { tab: "members" },
}

export const competitions = { name: "competitions" }
export const competitionDetails = { name: "competitionDetails" }
export const competitionDisciplines = { name: "competitionDisciplines" }
export const competitionDiscipline = { name: "competitionDiscipline" }
export const competitionDisciplineGroups = { name: "competitionDisciplineGroups" }
export const competitionAreas = { name: "competitionAreas" }
export const competitionArea = { name: "competitionArea" }

export const manageCompetitions = { name: "manageCompetitions" }
export const createCompetition = { name: "createCompetition" }
export const manageCompetitionDetails = { name: "manageCompetitionDetails" }
export const createCompetitionDiscipline = { name: "createCompetitionDiscipline" }
export const manageCompetitionDiscipline = { name: "manageCompetitionDiscipline" }
export const createCompetitionArea = { name: "createCompetitionArea" }
export const manageCompetitionArea = { name: "manageCompetitionArea" }
