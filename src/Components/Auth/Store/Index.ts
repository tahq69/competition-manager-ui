import { Module } from "vuex"

import { IState as RootState } from "@/Store/types"

import actions from "./Actions"
import { IState } from "./types"
import getters from "./Getters"
import mutations from "./Mutations"
import state from "./State"

export const store: Module<IState, RootState> = {
  state,
  mutations,
  getters,
  actions,
}

export { Getters } from "./types"
