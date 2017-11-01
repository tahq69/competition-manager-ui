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
export const newMessage: IRoute = { name: "newMessage" }

export const readPost: IRoute = { name: "readPost" }
export const createPost: IRoute = { name: "createPost" }
export const listPosts: IRoute = { name: "listPosts" }
export const editPost: IRoute = { name: "editPost" }

export const manageTeams: IRoute = { name: "manageTeams" }
export const manageTeamMembers: IRoute = { name: "manageTeamMembers" }
export const createTeam: IRoute = { name: "createTeam" }
export const createTeamMember: IRoute = { name: "createTeamMember" }
export const editTeam: IRoute = { name: "editTeam" }
export const editTeamMember: IRoute = { name: "editTeamMember" }
export const teamDetails: IRoute = {
  name: "teamDetails",
  params: { tab: "members" },
}

export const createCompetition: IRoute = { name: "createCompetition" }
export const listCompetitions: IRoute = { name: "listCompetitions" }
export const editCompetition: IRoute = { name: "editCompetition" }
