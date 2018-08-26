import { IState } from "@/components/auth/store/typings";

export default {
  user: {
    authenticated: false,
    id: 0,
    name: "",
    email: ""
  },
  loading: false,
  roles: [],
  team_roles: {},
  competitions: []
} as IState;
