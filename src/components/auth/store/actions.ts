import http from "axios";
import { ActionContext } from "vuex";

import { url as createUrl } from "@/helpers/rest";
import { IState as RootState } from "@/store/typings";

import authService from "@/components/auth/service";
import {
  IAddCompetitionPayload,
  ICompetition,
  IFetchAuthUser,
  IFetchCompetition,
  IState,
  IUpdateUserDetailsPayload
} from "@/components/auth/store/typings";

type Action = ActionContext<IState, RootState>;

export default {
  async fetchAuthUser({ commit, state }: Action, payload: IFetchAuthUser) {
    if (state.user.authenticated) return;

    const user = await authService.fetchAuthenticatedUser();
    commit<IUpdateUserDetailsPayload>({
      type: "updateAuthUserDetails",
      email: user.email,
      id: parseInt(user.id.toString(), 10),
      name: user.name,
      roles: user.roles,
      team_roles: user.team_roles
    });
  },

  async fetchCompetition(
    { commit, getters }: Action,
    payload: IFetchCompetition
  ): Promise<ICompetition> {
    if (getters.getCmById(payload.id)) return getters.getCmById(payload.id);

    const url = createUrl("competitions/{id}", { urlReplace: payload });

    const { data } = await http.get(url);
    const add: IAddCompetitionPayload = {
      type: "addCompetition",
      id: data.id,
      team_id: data.team_id
    };

    commit<IAddCompetitionPayload>(add);

    return add;
  }
};
