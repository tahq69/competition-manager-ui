import { ActionContext } from "vuex";

import { IState as RootState } from "@/store/typings";
import { fetchMessageCount } from "@/modules/user/service";
import {
  State,
  MutateUnreadMessageCount as MutateCount,
  MutateUnreadMessageCountLoading as MutateLoading,
  FetchUnreadMessageCount as FetchMsgCount
} from "@/modules/user/store/typings";

type Action = ActionContext<State, RootState>;

/**
 * Definition:
 * fetchUnreadMessageCount();
 */

export default {
  async fetchUnreadMessageCount({ commit }: Action, payload: FetchMsgCount) {
    commit<MutateLoading>({ type: "mutateUnreadMessageCountLoading" });

    const count = await fetchMessageCount();

    commit<MutateCount>({ type: "mutateUnreadMessageCount", count: count });
  }
};
