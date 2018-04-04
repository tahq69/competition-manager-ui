import { Module } from "vuex";

import { IState as RootState } from "@/store/types";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";
import { IState } from "./types";

export const store: Module<IState, RootState> = {
  state,
  mutations,
  getters,
  actions
};

export { Getters } from "./types";
