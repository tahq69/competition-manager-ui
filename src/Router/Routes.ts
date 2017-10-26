export interface IRoute {
  name: string

  [key: string]: any
}

export const home: IRoute = { name: "home" }

export const login: IRoute = { name: "login" }
export const signUp: IRoute = { name: "signUp" }
export const profile: IRoute = { name: "profile" }
export const forgotPassword: IRoute = { name: "forgotPassword" }
export const passwordReset: IRoute = { name: "passwordReset" }

export const createPost: IRoute = { name: "createPost" }
export const listPosts: IRoute = { name: "listPosts" }

export const createTeam: IRoute = { name: "createTeam" }
export const listTeams: IRoute = { name: "listTeams" }

export const createCompetition: IRoute = { name: "createCompetition" }
export const listCompetitions: IRoute = { name: "listCompetitions" }
