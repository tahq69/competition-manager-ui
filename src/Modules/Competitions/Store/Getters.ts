import { Id } from "@/types"

import { IState } from "./types"

export default {
  getCmById: (state: IState) => (id: Id) => {
    return state.competitions.find(cm => cm.id.toString() === id.toString())
  },
}
