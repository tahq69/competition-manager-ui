import { Module } from 'vuex'
import { State as RootState } from '@/Store/Contracts'
import { State } from './Contracts'

import getters from './Getters'
import mutations from './Mutations'
import state from './State'
import actions from './Actions'

export default {
  state,
  mutations,
  getters,
  actions,
} as Module<State, RootState>
