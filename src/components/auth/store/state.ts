import { IState } from "./types";

export default {
  user: {
    authenticated: false,
    id: 0,
    name: "",
    email: ""
  },
  roles: [],
  team_roles: {},
  competitions: []
} as IState;
