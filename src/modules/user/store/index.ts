import { Module } from "vuex";

import { IState as RootState } from "@/store/typings";

import actions from "@/modules/user/store/actions";
import getters from "@/modules/user/store/getters";
import mutations from "@/modules/user/store/mutations";
import state from "@/modules/user/store/state";
import { State } from "@/modules/user/store/typings";

export const store: Module<State, RootState> = {
  state,
  mutations,
  getters,
  actions
};

export { Getters } from "@/modules/user/store/typings";