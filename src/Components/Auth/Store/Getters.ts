import { State, User } from './Contracts'

export default {
  user(state: State): User {
    return state.user
  },

  isAuthenticated(state: State): boolean {
    return state.user.authenticated
  },

  roles(state: State): string[] {
    return state.roles
  },
}
