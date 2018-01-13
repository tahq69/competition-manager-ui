import { ActionContext, Store } from "vuex"

import { ICommonState as State, IState as Root } from "@/Store/types"

type A = ActionContext<State, Root>

export default {}
