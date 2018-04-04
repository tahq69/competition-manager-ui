import { IState as AuthState } from "@/components/auth/store/types";

export interface IState {
  auth: AuthState;
}

export interface ICommonState {
  test: null;
}
