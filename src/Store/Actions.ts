import { ActionContext, Store } from "vuex"

import { ICommonState as State, IState as Root } from "@/Store/Contracts"

type A = ActionContext<State, Root>

export default {}
