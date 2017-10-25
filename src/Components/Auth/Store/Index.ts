import { Module } from "vuex"

import { State as RootState } from "@/Store/Contracts"

import actions from "./Actions"
import { IState } from "./Contracts"
import getters from "./Getters"
import mutations from "./Mutations"
import state from "./State"

export default {
  state,
  mutations,
  getters,
  actions,
} as Module<IState, RootState>
