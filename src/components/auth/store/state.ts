import { IState } from "@/components/auth/store/typings";

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
