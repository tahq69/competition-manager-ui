import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import { Getters as AuthGetters, store as auth } from "@/Components/Auth/Store"
import { store as user } from "@/Modules/User/Store"

import actions from "./Actions"
import state from "./State"

export type Getters = AuthGetters & {}

export const store = new Vuex.Store({
  modules: {
    common: { actions, state },
    auth,
    user,
  },
})

export const getters: Getters = store.getters
