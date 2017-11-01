import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import auth from "@/Components/Auth/Store"
import teams from "@/Modules/Teams/Store"
import user from "@/Modules/User/Store"

export default new Vuex.Store({
  modules: { auth, user, teams },
})
