import { IState, IUser } from "./Contracts"

export default {
  user(state: IState): IUser {
    return state.user
  },

  isAuthenticated(state: IState): boolean {
    return state.user.authenticated
  },

  roles(state: IState): string[] {
    return state.roles
  },
}
