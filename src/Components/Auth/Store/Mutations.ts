import { ILogoutPayload, IState, IUpdateUserDetailsPayload } from "./Contracts"

export default {
  logout(state: IState, payload: ILogoutPayload) {
    state.user.authenticated = false
    state.user.email = ""
    state.user.id = 0
    state.user.name = ""

    state.roles = []
  },

  updateAuthUserDetails(state: IState, payload: IUpdateUserDetailsPayload) {
    state.user.name = payload.name
    state.user.email = payload.email
    state.user.id = payload.id
    state.roles = []
    payload.roles.forEach(role => state.roles.push(role.key))

    // allow listeners to watch that user details has received
    state.user.authenticated = true
  },
}
