import { IState as AuthState } from "@/components/auth/store/typings";

export interface IState {
  auth: AuthState;
}

export interface ICommonState {
  test: null;
}
