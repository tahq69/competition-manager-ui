import {
  State,
  MutateUnreadMessageCount,
  MutateUnreadMessageCountLoading as StartLoading
} from "@/modules/user/store/typings";

export default {
  mutateUnreadMessageCount(state: State, payload: MutateUnreadMessageCount) {
    state.messages.loading = false;
    state.messages.unreadCount = payload.count;
  },

  mutateUnreadMessageCountLoading(state: State, payload: StartLoading) {
    state.messages.loading = true;
  }
};
