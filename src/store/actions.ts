import { ActionContext, Store } from "vuex";

import { ICommonState as State, IState as Root } from "@/store/typings";

type A = ActionContext<State, Root>;

export default {};
