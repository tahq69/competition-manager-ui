import { Module } from "vuex"

import { IState as RootState } from "@/Store/types"

import actions from "./Actions"
import getters from "./Getters"
import mutations from "./Mutations"
import state from "./State"
import { IState } from "./types"

export const store: Module<IState, RootState> = {
  state,
  mutations,
  getters,
  actions,
}

export { Getters } from "./types"
