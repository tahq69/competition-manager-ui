import { ILogoutPayload, IState, IUpdateUserDetailsPayload } from "./Contracts"

export default {
  logout(state: IState, payload: ILogoutPayload) {
    state.user.authenticated = false
    state.user.email = ""
    state.user.id = 0
    state.user.name = ""

    state.roles = []
    state.team_roles = {}
  },

  updateAuthUserDetails(state: IState, payload: IUpdateUserDetailsPayload) {
    state.user.name = payload.name
    state.user.email = payload.email
    state.user.id = payload.id
    state.roles = []
    state.team_roles = {}
    payload.roles.forEach(role => state.roles.push(role.key))

    // Map each team roles and make a list of strings for each team.
    Object.keys(payload.team_roles).forEach(key => {
      const roles: string[] = []
      payload.team_roles[key].forEach(role => roles.push(role.key))
      state.team_roles[key] = roles
    })

    // allow listeners to watch that user details has received
    state.user.authenticated = true
  },
}
