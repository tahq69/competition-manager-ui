import http from 'axios'
import { Store, ActionContext } from 'vuex'

import { Api } from '@/Helpers/Api'
import { State as RootState } from '@/Store/Contracts'

import {
  State, UpdateUserDetailsPayload, FetchAuthUser, Login
} from './Contracts'

type Action = ActionContext<State, RootState>

export default {
  async fetchAuthUser({ commit, state }: Action, payload: FetchAuthUser) {
    if (state.user.authenticated) return

    const url = Api.url({ path: 'users/user' })
    try {
      const { data } = await http.get(url)
      const payload = {
        type: 'updateAuthUserDetails',
        email: data.email,
        id: data.id,
        name: data.name,
        roles: data.roles.map(role => ({ key: role.key }))
      } as UpdateUserDetailsPayload

      commit<UpdateUserDetailsPayload>(payload)
    } catch (error) {
      Api.handle(error)
    }
  },

  async login({ commit, state }: Action, payload: Login) {
    if (state.user.authenticated) return

    const url = Api.url({ path: 'oauth/token', root: true })
    let { data } = await http.post(url, payload)
    return data
  },
}
