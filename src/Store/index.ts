import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import auth from "@/Components/Auth/Store"
import teams from "@/Modules/Teams/Store"
import user from "@/Modules/User/Store"

import actions from "./Actions"
import state from "./State"

export default new Vuex.Store({
  modules: {
    common: { actions, state },
    auth,
    user,
    teams,
  },
})
