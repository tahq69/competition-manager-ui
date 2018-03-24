import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import { Getters as AuthGetters, store as auth } from "@/components/auth/store"

import actions from "./actions"
import state from "./state"

export type Getters = AuthGetters & {}

export const store = new Vuex.Store({
  modules: {
    common: { actions, state },
    auth,
  },
})

export const getters: Getters = store.getters
