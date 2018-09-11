import { State } from "@/modules/user/store/typings";

/**
 * Definition:
 * isMessageCountLoading: boolean;
 * getUnreadMessageCount: number;
 */

export default {
  isMessageCountLoading(state: State): boolean {
    return state.messages.loading;
  },

  getUnreadMessageCount(state: State): number {
    return state.messages.unreadCount;
  }
};
