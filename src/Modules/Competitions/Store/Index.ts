import { Module } from "vuex"

import { IState as RootState } from "@/Store/types"

import actions from "./Actions"
import getters from "./Getters"
import mutations from "./Mutations"
import state from "./State"
import { IState } from "./types"

export default {
  state,
  mutations,
  getters,
  actions,
} as Module<IState, RootState>
