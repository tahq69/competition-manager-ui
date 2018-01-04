import { RawLocation } from "vue-router"

export const home: RawLocation = { name: "home" }

export const login: RawLocation = { name: "login" }
export const signUp: RawLocation = { name: "signUp" }
export const profile: RawLocation = { name: "profile" }
export const forgotPassword: RawLocation = { name: "forgotPassword" }
export const resetPassword: RawLocation = { name: "resetPassword" }

export const messages: RawLocation = { name: "messages" }
export const message: RawLocation = { name: "message" }
export const createMessage: RawLocation = { name: "createMessage" }

export const managePosts: RawLocation = { name: "managePosts" }
export const createPost: RawLocation = { name: "createPost" }
export const managePost: RawLocation = { name: "managePost" }
export const readPost: RawLocation = { name: "readPost" }

export const manageTeams: RawLocation = { name: "manageTeams" }
export const createTeam: RawLocation = { name: "createTeam" }
export const manageTeam: RawLocation = { name: "manageTeam" }

export const manageTeamMembers: RawLocation = { name: "manageTeamMembers" }
export const createTeamMember: RawLocation = { name: "createTeamMember" }
export const manageTeamMember: RawLocation = { name: "manageTeamMember" }

export const teamDetails: RawLocation = {
  name: "teamDetails",
  params: { tab: "members" },
}

export const manageCompetitions: RawLocation = { name: "manageCompetitions" }
export const createCompetition: RawLocation = { name: "createCompetition" }
export const manageCompetitionDetails: RawLocation = { name: "manageCompetitionDetails" }
export const manageCompetitionDisciplines: RawLocation = { name: "manageCompetitionDisciplines" }
export const manageCompetitionDiscipline: RawLocation = { name: "manageCompetitionDiscipline" }
export const manageCompetitionAreas: RawLocation = { name: "manageCompetitionAreas" }
export const manageCompetitionManagers: RawLocation = { name: "manageCompetitionManagers" }

export const competitionDiscipline: RawLocation = { name: "competitionDiscipline" }


