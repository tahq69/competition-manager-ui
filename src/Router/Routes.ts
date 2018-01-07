import { Location } from "vue-router"

export const home: Location = { name: "home" }

export const login: Location = { name: "login" }
export const signUp: Location = { name: "signUp" }
export const profile: Location = { name: "profile" }
export const forgotPassword: Location = { name: "forgotPassword" }
export const resetPassword: Location = { name: "resetPassword" }

export const messages: Location = { name: "messages" }
export const message: Location = { name: "message" }
export const createMessage: Location = { name: "createMessage" }

export const managePosts: Location = { name: "managePosts" }
export const createPost: Location = { name: "createPost" }
export const managePost: Location = { name: "managePost" }
export const readPost: Location = { name: "readPost" }

export const manageTeams: Location = { name: "manageTeams" }
export const createTeam: Location = { name: "createTeam" }
export const manageTeam: Location = { name: "manageTeam" }

export const manageTeamMembers: Location = { name: "manageTeamMembers" }
export const createTeamMember: Location = { name: "createTeamMember" }
export const manageTeamMember: Location = { name: "manageTeamMember" }

export const teamDetails: Location = {
  name: "teamDetails",
  params: { tab: "members" },
}

export const competitions: Location = { name: "competitions" }
export const competitionDetails: Location = { name: "competitionDetails" }
export const competitionDisciplines: Location = { name: "competitionDisciplines" }
export const competitionDiscipline: Location = { name: "competitionDiscipline" }

export const manageCompetitions: Location = { name: "manageCompetitions" }
export const createCompetition: Location = { name: "createCompetition" }
export const manageCompetitionDetails: Location = { name: "manageCompetitionDetails" }
export const createCompetitionDiscipline: Location = { name: "createCompetitionDiscipline" }
export const manageCompetitionDiscipline: Location = { name: "manageCompetitionDiscipline" }
export const manageCompetitionAreas: Location = { name: "manageCompetitionAreas" }
export const manageCompetitionManagers: Location = { name: "manageCompetitionManagers" }
