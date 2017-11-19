import { ActionContext, Store } from "vuex"

import { IState as RootState } from "@/Store/Contracts"

import { IState } from "./Contracts"

type A = ActionContext<IState, RootState>

export default {}
