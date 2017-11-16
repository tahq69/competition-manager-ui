export interface IRoute {
  name: string

  [key: string]: any
}

export const home: IRoute = { name: "home" }

export const login: IRoute = { name: "login" }
export const signUp: IRoute = { name: "signUp" }
export const profile: IRoute = { name: "profile" }
export const forgotPassword: IRoute = { name: "forgotPassword" }
export const resetPassword: IRoute = { name: "resetPassword" }

export const messages: IRoute = { name: "messages" }
export const message: IRoute = { name: "message" }
export const createMessage: IRoute = { name: "createMessage" }

export const managePosts: IRoute = { name: "managePosts" }
export const createPost: IRoute = { name: "createPost" }
export const managePost: IRoute = { name: "managePost" }
export const readPost: IRoute = { name: "readPost" }

export const manageTeams: IRoute = { name: "manageTeams" }
export const createTeam: IRoute = { name: "createTeam" }
export const manageTeam: IRoute = { name: "manageTeam" }

export const manageTeamMembers: IRoute = { name: "manageTeamMembers" }
export const createTeamMember: IRoute = { name: "createTeamMember" }
export const manageTeamMember: IRoute = { name: "manageTeamMember" }

export const teamDetails: IRoute = {
  name: "teamDetails",
  params: { tab: "members" },
}

export const manageCompetitions: IRoute = { name: "manageCompetitions" }
export const createCompetition: IRoute = { name: "createCompetition" }
export const manageCompetition: IRoute = { name: "manageCompetition" }
