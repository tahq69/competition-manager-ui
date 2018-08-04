import { Module } from "vuex";

import { IState as RootState } from "@/store/typings";

import actions from "@/components/auth/store/actions";
import getters from "@/components/auth/store/getters";
import mutations from "@/components/auth/store/mutations";
import state from "@/components/auth/store/state";
import { IState } from "@/components/auth/store/typings";

export const store: Module<IState, RootState> = {
  state,
  mutations,
  getters,
  actions
};

export { Getters } from "@/components/auth/store/typings";
