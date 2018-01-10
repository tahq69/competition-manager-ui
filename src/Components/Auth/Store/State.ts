import { IState } from "./Contracts"

export default {
  user: {
    authenticated: false,
    id: 0,
    name: "",
    email: "",
  },
  roles: [],
  team_roles: {},
} as IState
